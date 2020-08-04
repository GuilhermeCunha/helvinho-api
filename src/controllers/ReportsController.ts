import { Response, Request } from 'express'
import { HTTP_CODES } from '@utils/Contants'
import { Report } from '@entities/Report'
import { Pool } from '@entities/Pool'
import { Client } from '@entities/Client'
import moment from 'moment'

export class ReportsController {
  async generateDocument (req: Request, res: Response): Promise<Response | void> {
    const { pools, clientName, message } = req.body
    let { date } = req.body
    date = moment(date, 'DD-MM-YYYY').utc().toDate()
    return res.status(HTTP_CODES.CREATED).json(date)
  }

  async getByClient (req: Request, res: Response): Promise<Response | void> {
    const { client_id } = req.params
    const reports = await Report.find({
      relations: ['pools', 'client'],
      where: {
        client: {
          id: client_id
        }
      }
    })
    return res.status(HTTP_CODES.OK).json(reports)
  }

  async get (req: Request, res: Response): Promise<Response | void> {
    const reports = await Report.find({
      relations: ['pools']
    })
    return res.status(HTTP_CODES.OK).json(reports)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const report = await Report.findOne(id)
    if (report === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(report)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    const { pool_ids, client_id, message, date } = req.body
    let pools = []
    if (pool_ids.length > 0) {
      pools = await Pool.findByIds(pool_ids)
    }
    const client = await Client.findOne(client_id)
    const report = new Report()
    report.status = 'active'
    report.client = client
    report.message = message
    report.date = moment(date, 'DD-MM-YYYY').toDate()
    if (pools.length > 0) {
      report.pools = pools
    }

    const errors = await report.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_report = await report.save()
    return res.status(HTTP_CODES.CREATED).json(created_report)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { message, status } = req.body

    const report = await Report.findOne(id)
    if (report === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    report.message = message
    report.status = status

    const errors = await report.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await report.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const report = await Report.findOne(id)
    if (report === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await report.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new ReportsController()
