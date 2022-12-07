import {Context, Next} from 'koa';

export async function defaultHeaderMiddleware(ctx: Context, next: Next) {
  ctx.set(defaultHeaders);
  await next();
}

const defaultHeaders = {
  'content-type': 'application/json',
};
