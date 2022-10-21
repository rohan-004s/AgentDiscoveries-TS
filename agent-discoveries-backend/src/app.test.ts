import request from 'supertest'
import app from './app'
import { Knex } from 'knex'
import createDbConnection from './db'
import { Express } from 'express'

let db: Knex
let server: Express

beforeAll(() => {
  db = createDbConnection()
  server = app({ db })
})

afterAll(() => {
  db.destroy()
})

describe('Test the root path', () => {
  test('It should respond OK to a GET request', async () => {
    const response = await request(server).get('/')
    expect(response.statusCode).toBe(200)
  })
})
