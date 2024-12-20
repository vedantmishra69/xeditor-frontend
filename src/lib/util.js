import { API_URL, LANGUAGE_MAPPING } from "./constants";
import { v4 as uuidv4 } from "uuid";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import randomColor from "randomcolor";
import supabase from "./supabase";

export const submitCode = async (language, sourceCode, stdin, userData) => {
  const body = {
    user_id: userData?.id,
    user_name: userData?.name,
    language_id: LANGUAGE_MAPPING[language].id,
    source_code: encodeUTF8ToBase64(sourceCode),
    stdin: encodeUTF8ToBase64(stdin),
  };
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.log("Error getting access token in submitCode()");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/code/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (response.status < 300) return result;
    else console.error(result);
  } catch (error) {
    console.error(error.message);
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const config = {
  initialInterval: 500, // Start polling every 500ms
  maxInterval: 5000, // Maximum polling interval of 5 seconds
  timeout: 60000, // Total timeout of 60 seconds
  intervalMultiplier: 1.5, // Increase interval by 50% after each attempt
};

export const fetchResult = async (token) => {
  let interval = config.initialInterval;
  const startTime = Date.now();

  while (true) {
    try {
      const response = await fetch(`${API_URL}/code/result?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const submission = await response.json();
      if (response.status !== 200) {
        console.error(submission);
        return;
      }
      if (submission.status.id >= 3) {
        return {
          stdout: submission.stdout
            ? decodeBase64ToUTF8(submission.stdout)
            : "",
          stderr: submission.stderr
            ? decodeBase64ToUTF8(submission.stderr)
            : "",
          compile_output: submission.compile_output
            ? decodeBase64ToUTF8(submission.compile_output)
            : "",
          exit_code: submission.exit_code,
          status_id: submission.status_id,
          time: submission.time,
          memory: submission.memory,
        };
      }
      if (Date.now() - startTime > config.timeout) {
        console.error("Polling timeout exceeded!");
        return;
      }
      interval = Math.min(
        interval * config.intervalMultiplier,
        config.maxInterval
      );
      await delay(interval);
    } catch (error) {
      console.error(error.message);
    }
  }
};

const decodeBase64ToUTF8 = (base64String) => {
  // Remove any newlines from the base64 string
  const cleanBase64 = base64String.replace(/\n/g, "");

  // Convert base64 to binary data
  const binaryData = atob(cleanBase64);

  // Convert binary data to UTF-8
  return decodeURIComponent(
    Array.from(binaryData)
      .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
};

const encodeUTF8ToBase64 = (utf8String) => {
  // Convert UTF-8 string to binary data
  const binaryString = encodeURIComponent(utf8String).replace(
    /%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode(parseInt(p1, 16))
  );

  // Convert to base64
  const base64 = btoa(binaryString);

  // Add newlines every 64 characters for readability
  // This is optional but matches common base64 formatting
  return base64.replace(/(.{64})/g, "$1\n");
};

export const generateUUID = () => uuidv4();

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return { message: "Invite token copied to clipboard!" };
  } catch (err) {
    console.err(err);
    return { message: "Copying failed, please try again." };
  }
};

export const getRandomColor = () => {
  return randomColor().toLowerCase();
};

export const getThemeName = (theme) =>
  theme.replaceAll(" ", "-").toLowerCase().split("(")[0];

export const getRandomName = () => {
  return uniqueNamesGenerator({ dictionaries: [adjectives, animals] }).replace(
    "_",
    " "
  );
};

export const cursorStyle = (clientId, color) => {
  return `
    .yRemoteSelection-${clientId} {
      background-color: ${color};
    }
    .yRemoteSelectionHead-${clientId} {
      position: absolute;
      border-left: ${color} solid 2px;
      border-top: ${color} solid 2px;
      border-bottom: ${color} solid 2px;
      height: 100%;
      box-sizing: border-box;
    }
    .yRemoteSelectionHead-${clientId}::after {
      position: absolute;
      content: " ";
      border: 3px solid ${color};
      border-radius: 4px;
      left: -4px;
      top: -5px;
    }
  `;
};

export const removeCursorStyle = (clientId) => {
  const styleTags = document.getElementsByTagName("style");
  Array.from(styleTags).forEach((style) => {
    if (style.textContent.includes(`yRemoteSelection-${clientId}`)) {
      style.remove();
    }
  });
};
