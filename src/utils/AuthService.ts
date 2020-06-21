import { NextFunction, Response, Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { HTTP_CODES } from './Contants'

interface User {
    id: string;
    email: string;
    role: string;
    username: string;
}
interface TokenInfos {
    user: User;
}
class AuthService {
  async generateToken (data: TokenInfos): Promise<string> {
    return jwt.sign(data, String(process.env.SALT_KEY), { expiresIn: '600d' })
  }

  async decodeToken (token: string): Promise<TokenInfos> {
    const data = await jwt.verify(token, String(process.env.SALT_KEY)) as TokenInfos
    return data
  }

  authorize (req: Request, res: Response, next: NextFunction): void | Response {
    let token = req.headers['x-access-token']
    if (!token) {
      return res.status(HTTP_CODES.UNAUTHORIZED).json()
    } else {
      token = token as string
      jwt.verify(token, String(process.env.SALT_KEY), async function (err, decoded) {
        if (err) {
          console.log(err)
          return res.status(HTTP_CODES.UNAUTHORIZED).json()
        }
        next()
      })
    }
  }
}
export default new AuthService()
