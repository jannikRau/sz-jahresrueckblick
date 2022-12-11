import { Context, Next } from 'koa';
import { Snowflake } from '../snowflake/Snowflake';
import {
  createFromQueryResult,
} from '../model/PersonalReviewYearly';

export const getSzUsageOfYearHandler =
  (snowflake: Snowflake) =>
  async (ctx: Context, next: Next): Promise<void> => {
    const userId = ctx.params?.userId;
    if (userId) {
      const queryResult = await snowflake.executeSzUsageOfYearQuery(userId);
      ctx.body = createFromQueryResult(queryResult);
      ctx.status = 200;
    }
    await next();
  };
