import 'reflect-metadata'
import app from './app'
import { createConnection } from 'typeorm'
require('dotenv/config')

createConnection()
  .then(connection => {
    app.listen(Number(process.env.PORT) || 5000)
    console.log(`Runing the App on the port : ${Number(process.env.PORT) || 5000}`)
  })
  .catch(error => {
    console.log(error)
    throw error
  })
