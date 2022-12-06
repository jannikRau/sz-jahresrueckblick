import pinoLogger from 'pino';

export const logger = pinoLogger({
  base: undefined,
  timestamp: false,
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
  },
});
