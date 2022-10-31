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

    try {
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

      res.status(200).json({ username }).send()
    } catch (e) {
      res.status(400).send()
    }
  })

  router.put('/update', auth.isLoggedIn, async (req, res) => {
    const { password, imageUrl } = req.body

    interface Changes {
      hashedPassword?: string
      imageUrl?: string
    }

    const changes: Changes = {}

    if (password !== undefined) {
      const hashedPassword = await hashPassword(password)
      changes.hashedPassword = hashedPassword
    }
    if (imageUrl !== undefined) {
      changes.imageUrl = imageUrl
    }

    try {
      await db('users')
        .where({ userId: req.session.user?.userId })
        .update(changes)
      res.status(200).send()
    } catch (e) {
      res.status(400).send()
    }
  })

  router.put('/delete', auth.isLoggedIn, async (req, res) => {
    if (req.session.user?.userId === undefined) {
      return res.status(400).send()
    }

    try {
      await db('users')
        .delete()
        .where({ userId: req.session.user?.userId })
      res.status(200).send()
    } catch (e) {
      res.status(400).send()
    }
  })

  router.get('/get', auth.isLoggedIn, async (req, res) => {
    var query = db('users').select('userId', 'username', 'imageUrl')
    if (req.query.username !== undefined) {
      query = query.where({ username: req.query.username })
    }
    try {
      const users = await query
      res.status(200).json(users)
    } catch (e) {
      res.status(400).send()
    }
  })

  return router
}

export default createRouter
