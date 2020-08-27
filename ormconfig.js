require('dotenv/config')
const path = require('path')
function isProduction () {
  return process.env.PRODUCTION === 'TRUE'
}

const appRoot = isProduction() ? 'dist' : 'src'
const extPattern = isProduction() ? '*.js' : '*.ts'

const entitiesPath = path.join(appRoot, 'database', 'entity')
const migrationsPath = path.join(appRoot, 'database', 'migration')
const subscriberPath = path.join(appRoot, 'database', 'subscriber')

console.log('Configurações TypeORM:')
console.log(`-- Entities: ${path.join(entitiesPath, extPattern)}`)
console.log(`-- Migrations: ${path.join(migrationsPath, extPattern)}`)
console.log(`-- Subscriber: ${path.join(subscriberPath, extPattern)}`)

module.exports = {
  host: process.env.DB_HOST,
  type: 'mysql',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [
    path.join(entitiesPath, extPattern)
  ],
  migrations: [
    path.join(migrationsPath, extPattern)

  ],
  subscribers: [
    path.join(subscriberPath, extPattern)
  ],
  cli: {
    entitiesDir: entitiesPath,
    migrationsDir: migrationsPath,
    subscribersDir: subscriberPath
  }
}
