require('dotenv/config')

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
    'dist/database/entity/**/*.js'
  ],
  migrations: [
    'dist/database/migration/**/*.js'
  ],
  subscribers: [
    'dist/database/subscriber/**/*.js'
  ],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber'
  }
}
