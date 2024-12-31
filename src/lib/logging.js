import debug from "debug";

// Create namespaced loggers
export const logDebug = debug("app:debug");
export const logError = debug("app:error");
export const logInfo = debug("app:info");
