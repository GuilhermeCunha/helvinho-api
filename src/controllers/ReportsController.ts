import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/Contants'
import { Report } from '../database/entity/Report'
import { Pool } from '../database/entity/Pool'

export class ReportsController {
  async get (req: Request, res: Response): Promise<Response | void> {
    const reports = await Report.find({
      relations: ['pool']
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
    const { pool_id } = req.body

    const pool = await Pool.findOne(pool_id)
    if (pool === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    let report = new Report()
    report = Object.assign(report, req.body)
    report.pool = pool

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
