import router from 'koa-joi-router';
import { getSzUsageOfYearHandler } from '../handler/personalReviewYearly.handler';
import { Snowflake } from '../snowflake/Snowflake';

export function getApplicationRouterMiddleware(snowflake: Snowflake) {
  const applicationRouter = router();
  const Joi = router.Joi;

  applicationRouter.route({
    method: 'get',
    path: '/sz-jahresreview/:userId',
    handler: getSzUsageOfYearHandler(snowflake),
    validate: {
      params: {
        userId: Joi.string().required(),
      },
      failure: 400,
    },
  });

  return applicationRouter.middleware();
}
