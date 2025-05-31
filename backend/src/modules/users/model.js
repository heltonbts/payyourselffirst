import bcrypt from 'bcrypt'
import { prisma } from '../data/index.js'

const omit = keys => {}

const passwordCheck = async (params, next) => {
  const { password: passwordPlainText, ...where } = params.args.where

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

  const passwordEqual = await bcrypt.compare(passwordPlainText, result.password)

  if (!passwordEqual) {
    return false
  }
  return result
}

prisma.$use(async (params, next) => {
  if (params.model !== 'User') {
    return next(params, next)
  }

  if (params.action !== 'findUnique') {
    return next(params, next)
  }

  const result = params.args.where.password
    ? await passwordCheck(params, next)
    : await next(params, next)

  return result
})
