import 'reflect-metadata'
import app from './app'
import { createConnection } from 'typeorm'
import UserUtils from '@utils/UserUtils'
require('dotenv/config')

const PORT = Number(process.env.PORT_APP) || Number(process.env.PORT) || 5000
createConnection()
  .then(connection => {
    app.listen(PORT)
    UserUtils.createAdminsIfNecessary()
    console.log(`Runing the App on the port : ${PORT}`)
  })
  .catch(error => {
    console.log(error)
    throw error
  })
