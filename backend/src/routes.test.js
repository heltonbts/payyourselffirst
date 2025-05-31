import request from 'supertest'
import bcrypt from 'bcrypt'
import jwt from jsonwebtoken

import { prisma } from './modules/data/index'
import { app } from './server.setup.js'

describe('user routes', () => {
  beforeAll(async () => {
    await prisma.teste.deleteMany()
  })
  const originalUser = prisma.user
  prisma.user = prisma.teste

  it('should return not found with wrong password', async () => {
    //prepare
    const email = 'admin@dev.com'
    const password = '12345678'
    const server = app.listen()

    //execution
    const result = await request(server).get('/login').auth(email, password)

    //expectation
    expect(result.status).toBe(401)
  })

  it('should return not found with wrong username', async () => {
    //prepare
    const email = 'admin@dev.com1'
    const password = '123456789'
    const server = app.listen()

    //execution
    const result = await request(server).get('/login').auth(email, password)

    //expectation
    expect(result.status).toBe(401)
  })

  it('should return logged in user by correct credentials', async () => {
    const email = 'adminDB@dev.com1'
    const password = '123456789'
    const server = app.listen()

    const saltRounds = 10
    const hashedPass = await bcrypt.hash(password, saltRounds)

    // ✅ Verifique se o usuário foi criado
    const createdUser = await prisma.teste.create({
      data: {
        email,
        password: hashedPass,
        name: 'Test Admin',
      },
    })

    console.log('Created user:', createdUser)

    const result = await request(server).get('/login').auth(email, password)

    // ✅ Debug completo
    console.log('Status:', result.status)
    console.log('Body:', result.body)
    console.log('Request headers:', result.request._header)

    expect(result.status).toBe(200)
  })

  it('should return logged in user by correct credentials', async () => {
    const email = 'adminDB@dev.com1'
    const password = '123456789'
    const server = app.listen()

    const saltRounds = 10
    const hashedPass = await bcrypt.hash(password, saltRounds)

    // ✅ Verifique se o usuário foi criado
    const createdUser = await prisma.teste.create({
      data: {
        email,
        password: hashedPass,
        name: 'Test Admin',
      },
    })

    console.log('Created user:', createdUser)

    const result = await request(server).get('/login').auth(email, password)

    // ✅ Debug completo
    console.log('Status:', result.status)
    console.log('Body:', result.body)
    console.log('Request headers:', result.request._header)

    expect(result.status).toBe(200)
  })
})
