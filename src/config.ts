export interface Config {
  port: number;
  logLevel: string;
}

const config: Config = {
  port: +(process.env.PORT || 3000),
  logLevel: process.env.LOG_LEVEL || 'info',
};

export { config };
