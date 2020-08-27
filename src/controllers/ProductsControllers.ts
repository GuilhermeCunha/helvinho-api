import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/Contants'
import { Product } from '../database/entity/Product'

export class ProductsController {
  async get (req: Request, res: Response): Promise<Response | void> {
    const products = await Product.find()
    return res.status(HTTP_CODES.OK).json(products)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const product = await Product.findOne(id)
    if (product === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(product)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    let product = new Product()
    product = Object.assign(product, req.body)
    const errors = await product.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_product = await product.save()
    return res.status(HTTP_CODES.CREATED).json(created_product)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { name, unit } = req.body

    const product = await Product.findOne(id)
    if (product === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    product.name = name
    product.unit = unit

    const errors = await product.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await product.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const product = await Product.findOne(id)
    if (product === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await product.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new ProductsController()
