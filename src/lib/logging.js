import debug from "debug";

export const logDebug = debug("app:debug");
export const logError = debug("app:error");
export const logInfo = debug("app:info");

// add localStorage.debug = 'app:*' in browser console to see logs
