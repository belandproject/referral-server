'use strict';

import Router from 'koa-joi-router';
import referralsRouter from './referrals';
import referUserRouter from './referuser';

const router = new Router();
const apiV1 = new Router();
router.use('/referrals', referralsRouter.middleware());
router.use('/ref-users', referUserRouter.middleware());

apiV1.use('/v1', router.middleware());
export default apiV1;
