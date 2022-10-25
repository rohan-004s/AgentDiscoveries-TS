import { Knex } from 'knex'
import createDbConnection from '.'

let db: Knex

describe('Migrations', () => {
  beforeEach(() => {
    db = createDbConnection()
  })

  afterEach(() => {
    db.destroy()
  })

  it('Migrates up successfully', () => {
    return expect(db.migrate.latest()).resolves.not.toThrow()
  })

  it('Migrates down successfully after migrating up', () => {
    return expect(
      db.migrate.latest().then(() => db.migrate.rollback(undefined, true)),
    ).resolves.not.toThrow()
  })
})
