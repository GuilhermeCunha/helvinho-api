import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/Contants'
import { ProductQuantity } from '../database/entity/ProductQuantity'
import { Product } from '../database/entity/Product'

export class ProductQuantitiesController {
  async get (req: Request, res: Response): Promise<Response | void> {
    const productQuantities = await ProductQuantity.find()
    return res.status(HTTP_CODES.OK).json(productQuantities)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const productQuantity = await ProductQuantity.findOne(id)
    if (productQuantity === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(productQuantity)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    let productQuantity = new ProductQuantity()
    productQuantity = Object.assign(productQuantity, req.body)
    const errors = await productQuantity.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_productQuantity = await productQuantity.save()
    return res.status(HTTP_CODES.CREATED).json(created_productQuantity)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { productId, value } = req.body

    const productQuantity = await ProductQuantity.findOne(id)
    if (productQuantity === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    const product = await Product.findOne(productId)
    if (product === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    productQuantity.product = product
    productQuantity.value = value

    const errors = await productQuantity.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await productQuantity.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const productQuantity = await ProductQuantity.findOne(id)
    if (productQuantity === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await productQuantity.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new ProductQuantitiesController()
