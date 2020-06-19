import { NextFunction, Response, Request } from 'express'
import { User } from '../database/entity/User'
import { HTTP_CODES } from '../utils/contants'
import LoginService from '../utils/LoginService'
import AuthService from '../utils/AuthService'

export class AuthenticationsController {
  async login (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { email, password } = req.body

    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: 'Usuario nao encontrado' })
    }

    const success = await LoginService.login(user.password, password)
    if (!success) {
      return res.status(HTTP_CODES.UNAUTHORIZED).json()
    }

    const token = await AuthService.generateToken({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    })

    return res.status(HTTP_CODES.OK).json({
      token,
      profile: {
        email: user.email,
        username: user.username,
        role: user.role
      }
    })
  }
}
export default new AuthenticationsController()
