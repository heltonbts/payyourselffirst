export const getTokenByAuthHeader = authHeader => {
  const [type, credentials] = authHeader.split(' ')

  if (type !== 'Basic') {
    throw new Error('Wrong token type')
  }

  const decoded = Buffer.from(credentials, 'base64').toString('utf8')
  const encoded = Buffer.from(decoded, 'utf-8').toString('base64')

  if (encoded !== credentials) {
    throw new Error('Wrong credentials is not correct base64 encoded')
  }

  const [email, password] = decoded.split(':')

  if (decoded.indexOf(':') === -1) {
    throw new Error('Wrong credentials is not correct encoded')
  }

  return decoded.split(':')
}
