import { Context } from 'koa';
import { Logger } from 'pino';

export function responseLoggingMiddleware(logger: Logger) {
  return async (ctx: Context) => {
    logger.debug(
      { status: ctx.status, body: ctx.body ?? '<empty>', params: ctx.params ?? '<empty>' },
      `Sending response for path ${ctx.path}`,
    );
  };
}
