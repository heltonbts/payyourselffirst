import { jest } from '@jest/globals'
import { getTokenByAuthHeader } from './services'

describe('user module', () => {
  it('should return credentials by basic authentication token', () => {
    const email = 'admin@dev.com'
    const password = '123456789'
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('Base64')

    const basicToken = `Basic ${token}`

    const result = getTokenByAuthHeader(basicToken)

    expect(result).toEqual([email, password])
  })

  it('should return new error when token is not basic type', () => {
    const email = 'admin@dev.com'
    const password = '123456789'
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('Base64')

    const basicToken = `Bearer ${token}`

    const result = () => getTokenByAuthHeader(basicToken)

    expect(result).toThrowError(Error)
  })

  it('should throw new error when credentials is not on correct encoded format', () => {
    const email = 'admin@dev.com'
    const password = '123456789'
    const token = Buffer.from(`${email}${password}`, 'utf8').toString('Base64')

    const basicToken = `Basic ${token}`

    const result = () => getTokenByAuthHeader(basicToken)

    expect(result).toThrowError('Wrong credentials is not correct encoded')
  })

  it('should throw new error when credentials is not on correct format', () => {
    const email = 'admin@dev.com'
    const password = '123456789'
    const token = `${email}:${password}`

    const basicToken = `Basic ${token}`

    const result = () => getTokenByAuthHeader(basicToken)

    expect(result).toThrowError(
      'Wrong credentials is not correct base64 encoded'
    )
  })
})
