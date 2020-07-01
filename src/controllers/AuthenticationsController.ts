import { NextFunction, Response, Request } from 'express'
import { User } from '../database/entity/User'
import { HTTP_CODES } from '../utils/Contants'
import LoginService from '../utils/LoginService'
import AuthService from '../utils/AuthService'
import { ResetPassword } from '../database/entity/ResetPassword'
import * as crypto from 'crypto'
import EmailService from '../utils/EmailServer'
import moment from 'moment'

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

  async generateResetToken (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { email } = req.query

    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: 'Usuario nao encontrado' })
    }

    await ResetPassword.delete({
      user_id: user.id
    })

    const token = crypto.randomBytes(4).toString('hex')
    const expiresAt = moment().add(300, 'seconds')

    const resetPassword = new ResetPassword()
    resetPassword.token = token
    resetPassword.expiresAt = expiresAt.toDate()
    resetPassword.user_id = user.id

    await resetPassword.save()

    const success = await EmailService.sendMail(
      user.email,
      'Código de recuperação de senha',
      `<strong>O seu código de recuperação é: ${String(token)}`
    )
    if (success === true) return res.status(HTTP_CODES.OK).json({})
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({})
  }

  async resetPassword (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { token, password } = req.body
    const now = moment()

    const resetPassword = await ResetPassword.findOne({
      where: {
        token
      }
    })
    if (resetPassword === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: 'Token de recuperação nao encontrado' })
    }

    if (moment(resetPassword.expiresAt) < now) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Token inválido' })
    }

    const user = await User.findOne({
      where: {
        id: resetPassword.user_id
      }
    })
    if (user === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: 'Usuario nao encontrado' })
    }

    user.password = await LoginService.createHashedPassword(password)
    await user.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new AuthenticationsController()
