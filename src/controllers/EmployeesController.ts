import { Response, Request } from 'express'
import { HTTP_CODES } from '../utils/contants'
import { Employee } from '../database/entity/Employee'

export class EmployeesController {
  async get (req: Request, res: Response): Promise<Response | void> {
    const employees = await Employee.find()
    return res.status(HTTP_CODES.OK).json(employees)
  }

  async getOne (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const employee = await Employee.findOne(id)
    if (employee === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }
    return res.status(HTTP_CODES.OK).json(employee)
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    let employee = new Employee()
    employee = Object.assign(employee, req.body)
    const errors = await employee.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      console.log(errors)
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    const created_employee = await employee.save()
    return res.status(HTTP_CODES.CREATED).json(created_employee)
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params
    const { name, address, category, cellphone, secondCellphone } = req.body

    const employee = await Employee.findOne(id)
    if (employee === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    employee.name = name
    employee.address = address
    employee.category = category
    employee.cellphone = cellphone
    employee.secondCellphone = secondCellphone

    const errors = await employee.validate()
      .then(() => null)
      .catch((err) => err)

    if (errors !== null) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(errors)
    }

    await employee.save()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params

    const employee = await Employee.findOne(id)
    if (employee === undefined) {
      return res.status(HTTP_CODES.NOT_FOUND).json()
    }

    await employee.remove()
    return res.status(HTTP_CODES.OK_WITHOUT_CONTENT).json()
  }
}
export default new EmployeesController()
