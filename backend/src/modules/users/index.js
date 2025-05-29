import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { prisma } from '../data/index.js'
import { getTokenByAuthHeader } from './services.js'

export const login = async ctx => {
  const [email, password] = getTokenByAuthHeader(
    ctx.request.headers.authorization
  )
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || !password) {
      ctx.status = 401
      ctx.body = 'User not found'
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      ctx.status = 401
      ctx.body = { error: 'Email ou senha inválidos' }
      return
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_KEY)

    ctx.status = 200
    ctx.body = { user, token }
  } catch (error) {
    console.log('error:', error)
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

export const list = async (ctx, next) => {
  try {
    const users = await prisma.user.findMany()
    ctx.body = users
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Internal Server Error'
    console.log(error)
    return
  }
}

export const create = async (ctx, next) => {
  const { name, email, password } = ctx.request.body
  try {
    if (!name || !email || !password) {
      ctx.status = 400
      ctx.body = { error: 'Nome, email e senha são obrigatórios' }
      return
    }

    const saltRounds = 10
    const hashedPass = await bcrypt.hash(ctx.request.body.password, saltRounds)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    })

    ctx.status = 201
    ctx.body = {
      message: 'Usuário criado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

export const update = async ctx => {
  try {
    const { id } = ctx.params
    const { name, email, password } = ctx.request.body

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
      },
    })

    ctx.body = {
      message: 'Usuário atualizado com sucesso',
      user: updatedUser,
    }
  } catch (error) {
    if (error.code === 'P2025') {
      ctx.status = 404
      ctx.body = { error: 'Usuário não encontrado' }
      return
    }
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

export const remove = async (ctx, next) => {
  try {
    const { id } = ctx.params

    const userExists = await prisma.user.findUnique({
      where: { id },
    })

    if (!userExists) {
      ctx.status = 404
      ctx.body = { error: 'Usuário não encontrado' }
      return
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        deletedAt: true,
      },
    })

    ctx.status = 200
    ctx.body = {
      message: 'Usuário deletado com sucesso',
      user: deletedUser,
    }
  } catch (error) {
    if (error.code === 'P2025') {
      ctx.status = 404
      ctx.body = { error: 'Usuário não encontrado' }
      return
    }

    if (error.code === 'P2003') {
      ctx.status = 409
      ctx.body = {
        error: 'Não é possível deletar usuário com dados relacionados',
      }
      return
    }

    console.error('Erro no delete:', error)
    ctx.status = 500
    ctx.body = { error: 'Erro interno do servidor' }
  }
}
