import { Knex } from 'knex'
import createDbConnection from '.'

let db: Knex

describe('Seeds', () => {
  beforeEach(async () => {
    db = createDbConnection()
    await db.migrate.latest()
  })

  afterEach(() => {
    db.destroy()
  })

  it('Runs the seeds successfully', () => {
    return expect(db.seed.run()).resolves.not.toThrow()
  })
})
