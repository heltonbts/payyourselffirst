import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World!!!!!';

});

router.get('/users', (ctx, next) => {
  ctx.body = 'hello users';

});

app.use(bodyParser({
  enableTypes: ['json', 'form'],
  jsonLimit: '1mb',
  formLimit: '1mb'
}));
app.listen(3000);
app.use(router.routes())
app.use(router.allowedMethods());
