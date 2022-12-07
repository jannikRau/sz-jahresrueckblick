import {Context, Next} from 'koa';
import { handleSzUsageOfYearRequest } from '../service/szUsageOfYear.handler';
import { Snowflake } from '../snowflake/Snowflake';

export const getSzUsageOfYearController =
  (snowflake: Snowflake) =>
  async (ctx: Context, next: Next): Promise<void> => {
    const userId = ctx.params?.userId;
    if (userId) {
      ctx.body = await handleSzUsageOfYearRequest(userId, snowflake);
      ctx.status = 200;
    }
    await next();
  };
