import { Router } from 'express'
import { Knex } from 'knex'
import createAuthMiddleware from '../middleware/auth'

function createRouter(db: Knex) {
  const auth = createAuthMiddleware(db)
  const router = Router()

  router.post('/', auth.isAdmin, async (req, res) => {
    // this unpacking and re-packing is to make sure that we only insert
    // the fields we want and not any that the user may sneak into the
    // request body
    const { callSign, firstName, lastName, dateOfBirth, agentRank } =
      req.body

    const newAgent = {
      callSign,
      firstName,
      lastName,
      dateOfBirth,
      agentRank,
    }

    await db('agents').insert([newAgent])

    res.status(200).send()
  })

  router.get('/:callSign', auth.isLoggedIn, async (req, res) => {
    var query = db('agents')
      .select('agentId', 'callSign', 'agentRank')
      .where({ callSign: req.params.callSign })

    try {
      const agents = await query
      res.status(200).json(agents)
    } catch (e) {
      res.status(400).send()
    }
  })

  router.put('/update', auth.isLoggedIn, async (req, res) => {
    const { callSign } = req.body

    if (req.session.user?.agentId === undefined) {
      return res.status(400).send()
    }

    try {
      await db('agents')
        .where({ agentId: req.session.user?.agentId })
        .update({ callSign })
      res.status(200).send()
    } catch (e) {
      res.status(400).send()
    }
  })

  router.put('/delete', auth.isLoggedIn, async (req, res) => {
    const { callSign } = req.body
    if (callSign === undefined) {
      return res.status(400).send('must specify an agent to delete')
    }

    const dbResponse: { agentId: number }[] = await db('agents')
      .select('agentId')
      .where({ callSign })
    if (dbResponse.length === 0) {
      return res.status(400).send()
    }
    const agentId = dbResponse[0].agentId

    if (agentId === undefined) {
      return res.status(400).send()
    }

    if (req.session.user?.agentId !== agentId) {
      // if we are trying to delete another user
      let dbResponse = await db('users')
        .select('admin')
        .where({ userId: req.session.user?.userId })

      let admin = dbResponse[0].admin
      if (!admin) {
        return res.status(403).send('non-admin cannot delete other agents')
      }
    }

    try {
      await db('agents').delete().where({ agentId })
      await db('users').update({ agentId: null }).where({ agentId })
      res.status(200).send()
    } catch (e) {
      res.status(400).send()
    }
  })

  return router
}

export default createRouter
