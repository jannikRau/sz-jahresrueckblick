export interface Config {
  port: number;
  logLevel: string;
  snowflakeUsername: string;
  snowflakePassword: string;
  snowflakeAccount: string;
  snowflakeRole: string;
}

const config: Config = {
  port: +(process.env.PORT || 3000),
  logLevel: process.env.LOG_LEVEL || 'debug',
  snowflakeUsername: process.env.SNOWFLAKE_USERNAME || 'snowflakeUsername',
  snowflakePassword: process.env.SNOWFLAKE_PASSWORD || 'snowflakePassword',
  snowflakeAccount: process.env.SNOWFLAKE_ACCOUNT || 'snowflakeAccount',
  snowflakeRole: process.env.SNOWFLAKE_ROLE || 'snowflakeRole',
};

export { config };
