import pino from "pino";

// see: https://getpino.io/#/docs/api?id=options-object
export const logger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
});
