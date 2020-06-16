import { NextFunction, Response, Request } from 'express'

export class AuthenticationsController {
  async login (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    return res.json()
  }
}
export default new AuthenticationsController()
