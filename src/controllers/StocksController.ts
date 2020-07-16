import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/Contants'
import { Stock } from '../database/entity/Stock'
import { ProductQuantity } from '../database/entity/ProductQuantity'
import { Product } from '../database/entity/Product'
import { Client } from '../database/entity/Client'

interface productQuantityStore {
    productId: string;
    value: number;
}

export class StocksController {
  async getByClient (req: Request, res: Response): Promise<Response | void> {
    const { client_id } = req.params
    const stocks = await Stock.find({
      relations: ['productQuantities', 'productQuantities.product'],
      where: {
        client: {
          id: client_id
        }
      },
      order: {
        date: 'DESC'
      }
    })

    return res.status(HTTP_CODES.OK).json(stocks)
  }

  async get (req: Request, res: Response): Promise<Response | void> {
    const stocks = await Stock.find({
      relations: ['client', 'productQuantities']
    })
    return res.status(HTTP_CODES.OK).json(stocks)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const stock = await Stock.findOne(id)
    if (stock === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(stock)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    const productQuantities:productQuantityStore[] = req.body.productQuantities
    const { client_id, date } = req.body

    const stock = new Stock()
    const client = await Client.findOne(client_id)
    stock.client = client
    stock.productQuantities = []
    stock.date = new Date(date)

    for (const pq of productQuantities) {
      const productQuantity = new ProductQuantity()
      productQuantity.product = await Product.findOne(pq.productId)
      productQuantity.value = pq.value
      stock.productQuantities.push(await productQuantity.save())
    }
    const errors = await stock.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_stock = await stock.save()
    return res.status(HTTP_CODES.CREATED).json(created_stock)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const productQuantities:productQuantityStore[] = req.body.productQuantities
    const { client_id } = req.body

    const stock = await Stock.findOne(id)
    if (stock === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    const client = await Client.findOne(client_id)
    stock.client = client
    stock.productQuantities = []

    for (const pq of productQuantities) {
      const productQuantity = new ProductQuantity()
      productQuantity.product = await Product.findOne(pq.productId)
      productQuantity.value = pq.value
      stock.productQuantities.push(await productQuantity.save())
    }

    const errors = await stock.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await stock.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const stock = await Stock.findOne(id)
    if (stock === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await stock.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new StocksController()
