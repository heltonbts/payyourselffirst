import request from 'supertest'
import { app } from './server.setup.js'

describe('user routes', () => {
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
    const email = 'admin@dev.co'
    const password = '123456789'
    const server = app.listen()

    //execution
    const result = await request(server).get('/login').auth(email, password)

    //expectation
    expect(result.status).toBe(401)
  })
})
