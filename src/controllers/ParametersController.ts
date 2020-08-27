import { Response, Request } from 'express'
import { HTTP_CODES } from '@utils/Contants'
import { Parameter, DEFAULT_VALUE } from '@entities/Parameter'
import { Pool } from '@entities/Pool'
import moment from 'moment'
import DateUtils from '@utils/DateUtils'
import { Between } from 'typeorm'
import NumberUtils from '@utils/NumberUtils'
interface FilterDateParameters {
  from?: Date;
  to?: Date;
}

export class ParametersController {
  async getByPool (req: Request, res: Response): Promise<Response | void> {
    const { pool_id } = req.params
    const { from, to }: FilterDateParameters = req.query
    const filters = DateUtils.handleDateFilters(from, to)

    const parameters = await Parameter.find({
      relations: ['pool'],
      where: {
        date: Between(filters.from, filters.to),
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
    const { pool_id, date, chlorine, ph, alkalinity, cyanuric } = req.body

    const pool = await Pool.findOne(pool_id)
    if (pool === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    const parameter = new Parameter()

    parameter.alkalinity = NumberUtils.isNumber(alkalinity) ? alkalinity : DEFAULT_VALUE

    parameter.cyanuric = NumberUtils.isNumber(cyanuric) ? cyanuric : DEFAULT_VALUE

    parameter.ph = NumberUtils.isNumber(ph) ? ph : DEFAULT_VALUE

    parameter.chlorine = NumberUtils.isNumber(chlorine) ? chlorine : DEFAULT_VALUE

    parameter.pool = pool
    parameter.date = moment(date, 'DD-MM-YYYY').toDate()
    const errors = await parameter.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }
    const oldParameter = await Parameter.findOne({
      where: {
        date: parameter.date,
        pool: {
          id: pool_id
        }
      }
    })
    if (!oldParameter) {
      const created_parameter = await parameter.save()
      return res.status(HTTP_CODES.CREATED).json(created_parameter)
    }
    return res.status(HTTP_CODES.CREATED).json({})
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { chlorine, ph, date, alkalinity, cyanuric } = req.body

    const parameter = await Parameter.findOne(id)
    if (parameter === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    parameter.date = moment(date, 'DD-MM-YYYY').toDate()

    parameter.alkalinity = NumberUtils.isNumber(alkalinity) ? alkalinity : DEFAULT_VALUE

    parameter.cyanuric = NumberUtils.isNumber(cyanuric) ? cyanuric : DEFAULT_VALUE

    parameter.ph = NumberUtils.isNumber(ph) ? ph : DEFAULT_VALUE

    parameter.chlorine = NumberUtils.isNumber(chlorine) ? chlorine : DEFAULT_VALUE

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
