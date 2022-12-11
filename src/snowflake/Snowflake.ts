import {
  Connection,
  ConnectionOptions,
  createConnection,
  SnowflakeError,
  Statement,
} from 'snowflake-sdk';
import { logger } from '../common/logger';
import { getSzUsageOfYearQuery } from './snowflakeQueries';

export interface QueryResult {
  rows: any[] | undefined;
}

export class Snowflake {
  private readonly snowFlakeConnection: Connection;

  constructor(snowflakeConfig: ConnectionOptions) {
    this.snowFlakeConnection = createConnection(snowflakeConfig);
    this.connect();
  }

  public async executeSzUsageOfYearQuery(
    userId: string,
  ): Promise<QueryResult> {
    return new Promise<QueryResult>((resolve, reject) => {
      this.snowFlakeConnection.execute({
        sqlText: getSzUsageOfYearQuery(userId),
        complete: (
          err: SnowflakeError | undefined,
          _stmt: Statement,
          rows: any[] | undefined,
        ) => {
          if (err) {
            logger.error(
              { err: err ?? '<empty>' },
              'Error occurred while executing statement for getting userData',
            );
            reject(err);
          } else {
            logger.debug(
              { result: rows ?? '<empty>' },
              'Successfully executed statement for getting userData',
            );
            resolve({ rows });
          }
        },
      });
    });
  }

  private connect() {
    this.snowFlakeConnection.connect((err, conn) => {
      if (err) {
        logger.error(
          { error: err ?? '<empty>' },
          'Failed to establish connection to Snowflake!',
        );
      } else {
        logger.info(
          `Successfully established connection to Snowflake. Using ID: ${conn.getId()}`,
        );
      }
    });
  }
}
