import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { router } from './routes.js'
import 'dotenv/config'

const app = new Koa()

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)

app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    jsonLimit: '1mb',
    formLimit: '1mb',
  })
)
app.use(router.routes())
app.use(router.allowedMethods())

export { app }
