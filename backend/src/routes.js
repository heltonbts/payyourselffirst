import Router from '@koa/router';

import { usersList } from './modules/users/index.js'


export const router = new Router();

router.get('/users', usersList);
