import { knex } from 'knex'
import knexConfig from './knexfile'
import config from '../config'

export const db = knex(knexConfig[config.environment])
