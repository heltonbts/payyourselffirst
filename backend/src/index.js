import Koa from 'koa'
import bodyParser from 'koa-bodyparser';
import { router } from './routes.js';

const app = new Koa();

app.use(bodyParser({
  enableTypes: ['json', 'form'],
  jsonLimit: '1mb',
  formLimit: '1mb'
}));
app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000);
