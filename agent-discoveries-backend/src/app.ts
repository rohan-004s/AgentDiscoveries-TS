import express from 'express'
import session from 'express-session'
import { Knex } from 'knex'
import config from './config'
import connectSessionKnex from 'connect-session-knex'
import user from './routes/user'

interface appProperties {
  db: Knex
}

function app({ db }: appProperties) {
  const app = express()
  const KnexSessionStore = connectSessionKnex(session)
  const store = new KnexSessionStore({ knex: db })

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: config.session.getSecret(),
      store,
    }),
  )

  app.use(express.json())

  app.get('/', async (_req, res) => {
    const test = await db('sqlite_master').select('*')
    res.status(200).json({ status: 'ok', test })
  })

  app.use('/user', user(db))

  return app
}

export default app
