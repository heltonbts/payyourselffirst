import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

export const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model !== 'User' || params.action !== 'findUnique') {
    return next(params, next)
  }

  const { password: passwordPLainText, ...where } = params.args.where
  const result = await next(
    {
      ...params,
      args: {
        ...params.args,
        where,
      },
    },
    next
  )

  if (!result) {
    return result
  }

  if (params.args.data && params.args.data.password) {
    const saltRounds = 10
    params.args.data.password = await bcrypt.hash(
      params.args.data.password,
      saltRounds
    )
  }

  return result
})
