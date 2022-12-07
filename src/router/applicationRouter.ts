import router from 'koa-joi-router';
import { getSzUsageOfYearController } from '../controller/szUsageOfYear.controller';
import { Snowflake } from '../snowflake/Snowflake';

export function getApplicationRouterMiddleware(snowflake: Snowflake) {
  const applicationRouter = router();
  const Joi = router.Joi;

  applicationRouter.route({
    method: 'get',
    path: '/sz-jahresreview/:userId',
    handler: getSzUsageOfYearController(snowflake),
    validate: {
      params: {
        userId: Joi.string().required(),
      },
      failure: 400,
    },
  });

  return applicationRouter.middleware();
}
