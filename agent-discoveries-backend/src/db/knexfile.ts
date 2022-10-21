import type { Knex } from 'knex'

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
    connection: {
      filename: './test.sqlite3',
    },
    useNullAsDefault: true,
  },
}

export default config
