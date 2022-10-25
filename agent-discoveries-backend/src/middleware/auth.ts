import { NextFunction, Request, Response } from 'express'
import { Knex } from 'knex'
import { Unauthorised } from '../models/error'
import { User } from '../models/user'

export default function createAuthMiddleware(knex: Knex) {
  async function isLoggedIn(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = await knex
        .select('userId')
        .from<User>('users')
        .where({ userId: req.session.user?.userId })

      if (!userId) {
        const err = new Unauthorised('Not logged in!')
        return next(err)
      }

      return next()
    } catch (err) {
      return next(err)
    }
  }

  async function isAdmin(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(JSON.stringify(req.session.user))

      const isAdmin = await knex
        .select('admin')
        .from<User>('users')
        .where({ userId: req.session.user?.userId })

      if (!isAdmin) {
        const err = new Unauthorised('Insufficient permissions')
        return next(err)
      }

      return next()
    } catch (err) {
      return next(err)
    }
  }

  return {
    isLoggedIn,
    isAdmin,
  }
}
