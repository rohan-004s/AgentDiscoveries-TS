import express from 'express'
import session from 'express-session'
import config from './config'

const app = express()

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: config.secret,
  }),
)

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

export default app
