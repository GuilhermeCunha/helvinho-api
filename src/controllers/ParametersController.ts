import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/Contants'
import { Parameter } from '../database/entity/Parameter'
import { Pool } from '../database/entity/Pool'
import moment from 'moment'

export class ParametersController {
  async getByPool (req: Request, res: Response): Promise<Response | void> {
    const { pool_id } = req.params
    const parameters = await Parameter.find({
      relations: ['pool'],
      where: {
        pool: {
          id: pool_id
        }
      }
    })
    return res.status(HTTP_CODES.OK).json(parameters)
  }

  async get (req: Request, res: Response): Promise<Response | void> {
    const parameters = await Parameter.find({
      relations: ['pool']
    })
    return res.status(HTTP_CODES.OK).json(parameters)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const parameter = await Parameter.findOne(id)
    if (parameter === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(parameter)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    const { pool_id, date } = req.body

    const pool = await Pool.findOne(pool_id)
    if (pool === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    let parameter = new Parameter()
    parameter = Object.assign(parameter, req.body)
    parameter.pool = pool
    parameter.date = moment(date, 'DD-MM-YYYY').toDate()
    const errors = await parameter.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_parameter = await parameter.save()
    return res.status(HTTP_CODES.CREATED).json(created_parameter)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { chlorine, ph, alkalinity, acid, cyanuric } = req.body

    const parameter = await Parameter.findOne(id)
    if (parameter === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    parameter.chlorine = chlorine
    parameter.ph = ph
    parameter.alkalinity = alkalinity
    parameter.acid = acid
    parameter.cyanuric = cyanuric

    const errors = await parameter.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await parameter.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const parameter = await Parameter.findOne(id)
    if (parameter === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await parameter.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new ParametersController()
