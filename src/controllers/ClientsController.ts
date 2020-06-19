import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/contants'
import { Client } from '../database/entity/Client'

export class ClientsController {
  async get (req: Request, res: Response): Promise<Response | void> {
    const clients = await Client.find()
    return res.status(HTTP_CODES.OK).json(clients)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const client = await Client.findOne(id)
    if (client === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(client)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    let client = new Client()
    client = Object.assign(client, req.body)
    const errors = await client.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_client = await client.save()
    return res.status(HTTP_CODES.CREATED).json(created_client)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { name, address, cnpj, cellphone, secondCellphone } = req.body

    const client = await Client.findOne(id)
    if (client === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    client.name = name
    client.address = address
    client.cnpj = cnpj
    client.cellphone = cellphone
    client.secondCellphone = secondCellphone

    const errors = await client.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await client.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const client = await Client.findOne(id)
    if (client === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await client.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new ClientsController()
