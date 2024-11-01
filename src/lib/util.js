import { API_URL, LANGUAGE_MAPPING } from "./constants";
import { v4 as uuidv4 } from "uuid";

export const submitCode = async (language, sourceCode, stdin) => {
  const body = {
    language_id: LANGUAGE_MAPPING[language].id,
    source_code: encodeUTF8ToBase64(sourceCode),
    stdin: encodeUTF8ToBase64(stdin),
  };
  try {
    const response = await fetch(`${API_URL}/code/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      const response = await fetch(`${API_URL}/code/result?token=${token}`);
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
