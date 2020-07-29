import { Response, Request } from 'express'
import { HTTP_CODES } from '@utils/Contants'
import { Parameter } from '@entities/Parameter'
import { Pool } from '@entities/Pool'
import moment from 'moment'
import DateUtils from '@utils/DateUtils'
import { Between } from 'typeorm'
interface FilterDateParameters {
  from?: Date;
  to?: Date;
}

export class ParametersController {
  async getByPool (req: Request, res: Response): Promise<Response | void> {
    const { pool_id } = req.params
    let { from, to }: FilterDateParameters = req.query
    if (!from || !to) {
      const { first, last } = DateUtils.getFirstAndLastDays()
      if (!from) {
        from = first
      }
      if (!to) {
        to = last
      }
    }

    const parameters = await Parameter.find({
      relations: ['pool'],
      where: {
        date: Between(from, to),
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
    parameter.chlorine = chlorine
    parameter.ph = ph
    parameter.alkalinity = alkalinity
    parameter.cyanuric = cyanuric
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
    const { chlorine, ph, alkalinity, cyanuric } = req.body

    const parameter = await Parameter.findOne(id)
    if (parameter === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    parameter.chlorine = chlorine
    parameter.ph = ph
    parameter.alkalinity = alkalinity
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
