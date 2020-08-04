import { Response, Request } from 'express'
import { HTTP_CODES } from '@utils/Contants'
import { Stock } from '@entities/Stock'
import { ProductQuantity } from '@entities/ProductQuantity'
import { Product } from '@entities/Product'
import { Client } from '@entities/Client'
import moment from 'moment'
import { Between } from 'typeorm'
import DateUtils from '@utils/DateUtils'
interface productQuantityStore {
    productId: string;
    value: number;
}
interface GenerateDocumentParameters {
  product_id?: String;
  client_id: String;
}

interface FilterDateParameters {
  from?: Date;
  to?: Date;
}

export class StocksController {
  async getByClient (req: Request, res: Response): Promise<Response | void> {
    const { client_id } = req.params
    const { from, to }: FilterDateParameters = req.query
    const filters = DateUtils.handleDateFilters(from, to)

    const stocks = await Stock.find({
      relations: ['productQuantities', 'productQuantities.product'],
      where: {
        date: Between(filters.from, filters.to),
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
    const formatedDate = moment(date, 'DD-MM-YYYY').toDate()
    const oldStock = await Stock.findOne({
      where: {
        client: client,
        date: formatedDate
      }
    })
    if (oldStock !== undefined) {
      return res.status(HTTP_CODES.CREATED).json(oldStock)
    }

    stock.client = client
    stock.productQuantities = []
    stock.date = formatedDate

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
    const { date } = req.body

    const stock = await Stock.findOne(id, {
      relations: ['client', 'productQuantities']
    })
    if (stock === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    stock.productQuantities = []

    for (const pq of productQuantities) {
      const productQuantity = new ProductQuantity()
      productQuantity.product = await Product.findOne(pq.productId)
      productQuantity.value = pq.value
      stock.productQuantities.push(await productQuantity.save())
    }
    stock.date = moment(date, 'DD-MM-YYYY').toDate()
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
