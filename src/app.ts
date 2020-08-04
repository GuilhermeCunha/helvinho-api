import express from 'express'
import cors from 'cors'
// import moment from 'moment-timezone'
import Routes from './routes'
import AuthenticationsController from '@controllers/AuthenticationsController'
import AuthService from './utils/AuthService'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')
// import portugueseLocale from 'moment/locale/pt-br'
// moment.updateLocale('pt-br', portugueseLocale)
// moment.tz.setDefault('America/Sao_Paulo')

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
    this.express.use(cors({ origin: true, credentials: true }))
  }

  private routes (): void {
    this.express.post('/login', AuthenticationsController.login)
    this.express.get('/generate_reset_token', AuthenticationsController.generateResetToken)
    this.express.put('/reset_password', AuthenticationsController.resetPassword)

    this.express.get('/', function (req, res) {
      return res.json({ message: 'Seja bem vindo(a)' })
    })

    this.express.use('',
      AuthService.authorize,
      Routes)
    // this.express.get('*', NotFoundRoute)
  }
}

export default new App().express
