import { API_URL, LANGUAGE_MAPPING } from "./constants";

export const submitCode = async (language, sourceCode, stdin) => {
  const body = {
    language_id: LANGUAGE_MAPPING[language].id,
    source_code: btoa(sourceCode),
    stdin: btoa(stdin),
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
          stdout: submission.stdout ? atob(submission.stdout) : "",
          stderr: submission.stderr ? atob(submission.stderr) : "",
          compile_output: submission.compile_output
            ? atob(submission.compile_output)
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
