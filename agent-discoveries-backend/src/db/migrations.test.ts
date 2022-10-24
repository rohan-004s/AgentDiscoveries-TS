import { Knex } from 'knex'
import createDbConnection from '.'

let db: Knex

describe('Migrations', () => {
  beforeEach(async () => {
    db = createDbConnection()
  })

  afterEach(() => {
    db.destroy()
  })

  test('It should successfully migrate up', () => {
    return expect(db.migrate.latest()).resolves.not.toThrow()
  })

  test('It should successfully migrate down after migrating up', () => {
    return expect(
      db.migrate.latest().then(() => db.migrate.rollback(undefined, true)),
    ).resolves.not.toThrow()
  })
})
