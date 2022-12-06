import Koa from 'koa';
// @ts-ignore
import cors from '@koa/cors';
import { applicationRouterMiddleware } from './router/applicationRouter';

export const app = new Koa();

app.use(cors());

app.use(async (ctx, next) => {
  ctx.set(defaultHeaders);
  await next();
});

app.use(applicationRouterMiddleware);

const defaultHeaders = {
  'content-type': 'application/json',
};
