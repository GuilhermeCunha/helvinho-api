import { Response, Request } from 'express'

export class PoolsController {
  async get (req: Request, res: Response): Promise<Response | void> {
    return res.json()
  }

  async post (req: Request, res: Response): Promise<Response | void> {
    return res.json()
  }

  async update (req: Request, res: Response): Promise<Response | void> {
    return res.json()
  }

  async delete (req: Request, res: Response): Promise<Response | void> {
    return res.json()
  }
}
export default new PoolsController()
