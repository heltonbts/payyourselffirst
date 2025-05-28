import Router from '@koa/router';

import * as users from './modules/users/index.js'


export const router = new Router();

// users
router.get('/users', users.list);
router.post('/users', users.create);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.remove);

//auth
router.post('/login', users.login)


