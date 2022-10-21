import express from 'express'
import session from 'express-session'
import { Knex } from 'knex'
import config from './config'

interface appProperties {
  db: Knex
}

function app({ db }: appProperties) {
  const app = express()

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: config.secret,
    }),
  )

  app.get('/', async (_req, res) => {
    const test = await db('sqlite_master').select('*')
    res.status(200).json({ status: 'ok', test })
  })

  return app
}

export default app
