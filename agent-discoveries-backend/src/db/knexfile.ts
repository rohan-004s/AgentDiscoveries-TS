import type { Knex } from 'knex'
import path from 'path'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'better-sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      extension: 'ts',
      directory: path.join(__dirname, 'migrations'),
    },
  },
}

export default config
