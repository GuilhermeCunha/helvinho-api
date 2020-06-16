import { Router, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from './database/entity/User'
const routes = Router()

routes.get('/', (req: Request, res: Response): Response => {
  const message = 'Okay'
  return res.json(message)
})

routes.get('/users', async (req: Request, res: Response): Promise<Response> => {
  const userRepository = getRepository(User)
  const users = await userRepository.find()
  return res.json(users)
})

routes.get('/users/create', async (req: Request, res: Response): Promise<Response> => {
  const userRepository = getRepository(User)
  const user = new User()
  user.age = 19
  user.firstName = 'guilherme'
  user.lastName = 'cunha'

  const created_user = await userRepository.save(user)
  return res.json(created_user)
})

export default routes
