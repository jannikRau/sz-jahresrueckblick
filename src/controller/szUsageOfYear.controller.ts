import { Context } from 'koa';
import { handleSzUsageOfYearRequest } from '../service/szUsageOfYear.handler';
import { Snowflake } from '../snowflake/Snowflake';
import { logger } from '../common/logger';

export async function getSzUsageOfYear(ctx: Context): Promise<void> {
  const userId = ctx.params?.userId;
  logger.info(`Received request for SZ-Jahresrückblick with userId: ${userId}`);
  if (userId) {
    const userData = await handleSzUsageOfYearRequest(
      userId,
      new Snowflake({
        username: 'CARMENHEGER',
        password: 'cbz56rg2WasAHwq',
        account: 'swmh_datenplattform.eu-central-1',
        role: 'G_SZDM_PAY',
      }),
    );
    ctx.body = userData;
    ctx.status = 200;
    logger.info(ctx, 'Sending response');
  }
}

/*
const defaultHeaders = {
  'access-control-allow-methods': 'OPTIONS,GET',
  'content-type': 'application/json; charset=utf-8',
};
con = snowflake.connector.connect(
    user="CARMENHEGER",
    password="cbz56rg2WasAHwq",
    account="swmh_datenplattform.eu-central-1",
    role="G_SZDM_PAY",
)
 */
