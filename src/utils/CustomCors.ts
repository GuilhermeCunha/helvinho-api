import { Request, Response, NextFunction } from 'express'
const allowedHeaders = ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token', 'Authorization']
const allowedMethods = ['GET, POST, OPTIONS, PUT, PATCH, DELETE']

export default function CustomCors (req: Request, res: Response, next: NextFunction): void {
// Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', allowedMethods)

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', allowedHeaders)

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //   res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
}
