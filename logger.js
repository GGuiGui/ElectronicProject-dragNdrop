const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const setupLogger = (logDir) => {
  return winston.createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      label({ label: 'Electron App' }),
      logFormat
    ),
    transports: [
      new winstonDaily({
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: `%DATE%.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error',
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
      new winston.transports.Console({
        level: 'error',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
    ],
  });
};

module.exports = setupLogger;