import { Context, Next } from 'koa';
import { Logger } from 'pino';

export function requestLoggingMiddleware(logger: Logger) {
  return async (ctx: Context, next: Next) => {
    logger.debug(
      { body: ctx.body ?? '<empty>', params: ctx.params ?? '<empty>' },
      `Received request for path ${ctx.path}`,
    );
    await next();
  };
}
