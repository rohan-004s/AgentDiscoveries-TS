import request from 'supertest'
import app from '../app'
import { Knex } from 'knex'
import createDbConnection from '../db'
import { Express } from 'express'
import { Agent } from '../models/agent'

let db: Knex
let server: Express

describe('The new agent route', () => {
  beforeEach(async () => {
    db = createDbConnection()
    await db.migrate.latest()
    await db.seed.run()
    server = app({ db })
  })

  afterEach(async () => {
    await db.destroy()
  })

  it('Returns 200 when successful', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'test_user', password: 'password' }),
      )

    const response = await request(server)
      .post('/agent/')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send(
        JSON.stringify({
          callSign: 'penguin',
          firstName: 'Oswald',
          lastName: 'Cobblepot',
          dateOfBirth: '1941-01-01',
          agentRank: 4,
        }),
      )
    expect(response.statusCode).toBe(200)
  })

  it('Creates a new user', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'test_user', password: 'password' }),
      )

    await request(server)
      .post('/agent/')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send(
        JSON.stringify({
          callSign: 'penguin',
          firstName: 'Oswald',
          lastName: 'Cobblepot',
          dateOfBirth: '1941-01-01',
          agentRank: 4,
        }),
      )

    const [{ agentId }] = await db
      .select('agentId')
      .from<Agent>('agents')
      .where({ callSign: 'penguin' })
    expect(agentId).toBeTruthy()
  })
})

describe('The update route', () => {
  beforeAll(async () => {
    db = createDbConnection()
    await db.migrate.latest()
    await db.seed.run()
    server = app({ db })
  })

  const resetDefaultCallSign = async () => {
    await db('agents').update({ callSign: 'Joker' }).where({ agentId: 1 })
  }

  beforeEach(resetDefaultCallSign)

  afterEach(resetDefaultCallSign)

  afterAll(() => {
    db.destroy()
  })

  it('Returns 200 when successful', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'joker', password: 'TakeYourHeart' }),
      )
    const response = await request(server)
      .put('/agent/update')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send(JSON.stringify({ callSign: 'harley' }))
    expect(response.statusCode).toBe(200)
  })

  it('Does update the database', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'joker', password: 'TakeYourHeart' }),
      )

    const changes = { callSign: 'harley' }

    const response = await request(server)
      .put('/agent/update')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send(JSON.stringify(changes))
    expect(response.statusCode).toBe(200)

    const [{ callSign }] = await db
      .select('callSign')
      .from<Agent>('agents')
      .where({ agentId: 1 })

    expect(callSign).toBe(changes.callSign)
  })
})

describe('The delete route', () => {
  beforeAll(async () => {
    db = createDbConnection()
    await db.migrate.latest()
    await db.seed.run()
    server = app({ db })
  })

  beforeEach(async () => {
    const dbResponse: { agentId: number }[] = await db('agents')
      .insert({
        callSign: 'penguin',
        firstName: 'Oswald',
        lastName: 'Cobblepot',
        dateOfBirth: '1941-01-01',
        agentRank: 4,
      })
      .returning('agentId')
    const agentId = dbResponse[0].agentId
    // associate a user with penguin
    await db('users').update({ agentId }).where({ username: 'test_user' })
    // now make sure admin user is in-fact an admin
    await db('users').update({ admin: 1 }).where({ username: 'admin' })
  })

  afterEach(async () => {
    await db('agents').delete().where({ callSign: 'penguin' })
  })

  afterAll(() => {
    db.destroy()
  })

  it('Returns 200 when successful', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'test_user', password: 'password' }),
      )
    const response = await request(server)
      .put('/agent/delete')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send(JSON.stringify({ callSign: 'penguin' }))
    expect(response.statusCode).toBe(200)
  })

  it('Does update the database', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'test_user', password: 'password' }),
      )

    await request(server)
      .put('/agent/delete')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send(JSON.stringify({ callSign: 'penguin' }))

    const dbResponse = await db
      .select()
      .from<Agent>('agents')
      .where({ callSign: 'penguin' })

    expect(dbResponse).toHaveLength(0)
  })

  it('Can delete other agents if admin', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ username: 'admin', password: 'password' }))
    const response = await request(server)
      .put('/agent/delete')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send(JSON.stringify({ callSign: 'penguin' }))
    expect(response.statusCode).toBe(200)
  })

  it('Cannot delete other agents if not admin', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'test_user', password: 'password' }),
      )
    const response = await request(server)
      .put('/agent/delete')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send(JSON.stringify({ callSign: 'Joker' }))
    expect(response.statusCode).toBe(403)
  })

  it('Requires an agent to be specified for deletion', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'test_user', password: 'password' }),
      )
    const response = await request(server)
      .put('/agent/delete')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send()
    expect(response.statusCode).toBe(400)
  })
})

describe('The get route', () => {
  beforeAll(async () => {
    db = createDbConnection()
    await db.migrate.latest()
    await db.seed.run()
    server = app({ db })
  })

  afterAll(() => {
    db.destroy()
  })

  it('Returns 200 when successful', async () => {
    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'test_user', password: 'password' }),
      )
    const response = await request(server)
      .get('/agent/joker')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send()
    expect(response.statusCode).toBe(200)
  })

  it('Can return a specific agent', async () => {
    const dbResponse = await db('agents')
      .select('agentId', 'callSign', 'agentRank')
      .where({ callSign: 'joker' })

    const loginResponse = await request(server)
      .post('/user/login')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({ username: 'test_user', password: 'password' }),
      )

    const query = await request(server)
      .get('/agent/joker')
      .set('Content-Type', 'application/json')
      .set('Cookie', loginResponse.get('Set-Cookie'))
      .send()

    expect(JSON.parse(query.text)).toEqual(dbResponse)
  })
})
