import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/Contants'
import { getRepository } from 'typeorm'
import { User } from '../database/entity/User'
import LoginService from '../utils/LoginService'

export class UsersController {
  async get (req: Request, res: Response): Promise<Response | void> {
    const usersRepository = getRepository(User)
    const users = await usersRepository.find()
    return res.status(HTTP_CODES.OK).json(users)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne(id)
    if (user === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(user)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    let user = new User()
    user = Object.assign(user, req.body)

    const errors = await user.validate()
      .then(() => null)
      .catch((err) => err)
    console.log(errors)

    user.password = await LoginService.createHashedPassword(user.password)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_user = await user.save()
    return res.status(HTTP_CODES.CREATED).json(created_user)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { email, username, role } = req.body

    const user = await User.findOne(id)
    if (user === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    user.email = email
    user.username = username
    user.role = role

    const errors = await user.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await user.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const user = await User.findOne(id)
    if (user === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await user.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new UsersController()
