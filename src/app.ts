// import routes from './routes'
import * as express from 'express'
import * as cors from 'cors'
import * as moment from 'moment-timezone'
import Routes from './routes'

moment.tz.setDefault('America/Sao_Paulo')

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    // this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes (): void {
    this.express.get('/', function (req, res) {
      return res.json({ message: 'Seja bem vindo(a)' })
    })

    this.express.use(Routes)
    // this.express.get('*', NotFoundRoute)
  }
}

export default new App().express
