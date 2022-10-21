import { Knex, knex } from 'knex'
import knexConfig from './knexfile'
import config from '../config'

export const createDbConnection = (): Knex =>
  knex(knexConfig[config.environment])

export default createDbConnection
