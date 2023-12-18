import { createLogger, format as _format, transports as _transports } from 'winston';

const LOGGER = createLogger({
  level: process.env.LOG_LEVEL ?? 'error',
  format: _format.simple(),
  // defaultMeta: { service: 'user-service' },
  transports: [
    new _transports.Console(),
  ],
});

export default LOGGER;
