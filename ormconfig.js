require('dotenv/config')
const path = require('path')
function isProduction () {
  return process.env.PRODUCTION === 'TRUE'
}

if (isProduction()) {
  console.log('Configurando TypeORM para ler arquivos de ./dist')
} else {
  console.log('Configurando TypeORM para ler arquivos de ./src')
}
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
    isProduction() ? path.join(__dirname, 'dist/database/entity/**/*.js}') : path.join(__dirname, 'src/database/entity/**/*.ts')

  ],
  migrations: [
    isProduction() ? path.join(__dirname, 'dist/database/migration/**/*.js') : path.join(__dirname, 'src/database/migration/**/*.ts')
  ],
  subscribers: [
    isProduction() ? path.join(__dirname, 'dist/database/subscriber/**/*.js') : path.join(__dirname, 'src/database/subscriber/**/*.ts')
  ],
  cli: {
    entitiesDir: isProduction() ? 'dist/database/entity' : 'src/database/entity',
    migrationsDir: isProduction() ? 'dist/database/migration' : 'src/database/migration',
    subscribersDir: isProduction() ? 'dist/database/subscriber' : 'src/database/subscriber'
  }
}
