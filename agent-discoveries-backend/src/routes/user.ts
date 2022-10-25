import { Router } from 'express'
import { Knex } from 'knex'
import { User } from '../models/user'
import { doPasswordsMatch } from '../utils/crypto'
import createAuthMiddleware from '../middleware/auth'
import { hashPassword } from '../utils/crypto'

function createRouter(db: Knex) {
  const auth = createAuthMiddleware(db)
  const router = Router()

  router.post('/', auth.isAdmin, async (req, res) => {
    const { username, password, agentId } = req.body

    const newUser = {
      username,
      hashedPassword: await hashPassword(password),
      agentId: agentId ? Number(agentId) : null,
    }

    await db('users').insert([newUser])

    res.status(200).send()
  })

  router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const [{ hashedPassword }] = await db
      .select('hashedPassword')
      .from<User>('users')
      .where({ username })

    if (!(await doPasswordsMatch(password, hashedPassword))) {
      res.status(400).send()
    }

    req.session.user = (
      await db.select().from<User>('users').where({ username })
    )[0]

    res.status(200).send()
  })

  return router
}

export default createRouter
