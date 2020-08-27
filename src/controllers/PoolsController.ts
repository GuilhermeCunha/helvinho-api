import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/Contants'
import { Pool } from '../database/entity/Pool'
import { Client } from '../database/entity/Client'

export class PoolsController {
  async getByClient (req: Request, res: Response): Promise<Response | void> {
    const { client_id } = req.params
    const pools = await Pool.find({
      relations: ['parameters'],
      where: {
        client: {
          id: client_id
        }
      }
    })
    return res.status(HTTP_CODES.OK).json(pools)
  }

  async get (req: Request, res: Response): Promise<Response | void> {
    const pools = await Pool.find({ relations: ['client'] })
    return res.status(HTTP_CODES.OK).json(pools)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const pool = await Pool.findOne(id)
    if (pool === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(pool)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    const pool = new Pool()
    const { name, client_id } = req.body

    const client = await Client.findOne(client_id)
    if (client === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    pool.name = name
    pool.client = client

    const errors = await pool.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_pool = await pool.save()
    return res.status(HTTP_CODES.CREATED).json(created_pool)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { name } = req.body

    const pool = await Pool.findOne(id)
    if (pool === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    pool.name = name

    const errors = await pool.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await pool.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    console.log(`Pool ID: ${id}`)
    const pool = await Pool.findOne(id)
    if (pool === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await pool.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new PoolsController()
