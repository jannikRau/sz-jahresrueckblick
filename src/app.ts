import Koa from 'koa';
import cors from '@koa/cors';
import { getApplicationRouterMiddleware } from './router/applicationRouter';
import { Snowflake } from './snowflake/Snowflake';
import { defaultHeaderMiddleware } from './middleware/defaultHeaderMiddleware';
import { requestLoggingMiddleware } from './middleware/requestLoggingMiddleware';
import { Logger } from 'pino';
import { responseLoggingMiddleware } from './middleware/responseLoggingMiddleware';

export function createApp(snowflake: Snowflake, logger: Logger): Koa {
  const app = new Koa();
  registerMiddlewaresForApp(app, snowflake, logger);
  return app;
}

function registerMiddlewaresForApp(
  app: Koa,
  snowflake: Snowflake,
  logger: Logger,
) {
  app.use(cors());
  app.use(requestLoggingMiddleware(logger));
  app.use(defaultHeaderMiddleware);
  app.use(getApplicationRouterMiddleware(snowflake));
  app.use(responseLoggingMiddleware(logger));
}
