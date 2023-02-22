import { createLogger, format as _format, transports as _transports } from 'winston';

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// };

const LOGGER = createLogger({
  level: process.env.LOG_LEVEL ?? 'error',
  format: _format.simple(),
  // defaultMeta: { service: 'user-service' },
  transports: [
    new _transports.Console(),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new _transports.Console({
//     format: _format.simple(),
//   }));
// }

export default LOGGER;
