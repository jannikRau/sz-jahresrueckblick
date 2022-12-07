import {
  Connection,
  ConnectionOptions,
  createConnection,
  SnowflakeError,
  Statement,
} from 'snowflake-sdk';
import { logger } from '../common/logger';
import { getUserDataQuery } from './snowflakeQueries';
import { UserData } from '../model/UserData';
import { createUserDataFromRows } from '../transformer/userData.transformer';

interface UserDataWrapper {
  userData: UserData | undefined;
}

export class Snowflake {
  private readonly snowFlakeConnection: Connection;

  constructor(snowflakeConfig: ConnectionOptions) {
    this.snowFlakeConnection = createConnection(snowflakeConfig);
    this.connect();
  }

  public async getUserData(userId: string): Promise<UserData | undefined> {
    let userDataWrapper: UserDataWrapper = { userData: undefined };
    return new Promise<UserData | undefined>((resolve, reject) => {
      this.snowFlakeConnection.execute({
        sqlText: getUserDataQuery(userId),
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
              { rows },
              'Successfully executed statement for getting userData',
            );
            userDataWrapper.userData = createUserDataFromRows(rows);
            resolve(userDataWrapper.userData);
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
