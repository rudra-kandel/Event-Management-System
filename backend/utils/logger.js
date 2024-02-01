// ======================= MODULES =====================
// Third-Party / Core Modules
const winston = require('winston');
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, json, prettyPrint } = format;

module.exports = () => {
  const logger = createLogger(
    {
      format: combine(
        timestamp(),
        json(),
        prettyPrint(),
      ),
      transports: [
        new transports.Console({ colorize: true, prettyPrint: true }),
        new transports.File({ filename: './uploads/error.log', level: 'error' }),
      ],
      rejectionHandlers: [
        new transports.Console({ colorize: true, prettyPrint: true }),
        new transports.File({ filename: './uploads/rejections.log', level: 'error' })
      ]
    }
  );

  process.on('uncaughtException', ex => {
    logger.error(ex.message, ex);
    process.exit(1);
  })

  process.on('unhandledRejection', ex => {
    logger.error(ex.message, ex);
    process.exit(1);
  })

  winston.add(logger);
}