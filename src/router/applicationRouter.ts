import router from 'koa-joi-router';
import { getSzUsageOfYear } from '../controller/szUsageOfYear.controller';

const applicationRouter = router();
const Joi = router.Joi;

applicationRouter.route({
  method: 'get',
  path: '/sz-jahresreview/:userId',
  handler: getSzUsageOfYear,
  validate: {
    params: {
      userId: Joi.string().required(),
    },
    failure: 400,
  },
});

export const applicationRouterMiddleware = applicationRouter.middleware();
