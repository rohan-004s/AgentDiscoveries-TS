import { Knex } from 'knex'
import { Agent } from '../../models/agent'
import { User } from '../../models/user'
import { hashPassword } from '../../utils/crypto'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('agents').del()
  await knex('users').del()

  // Inserts seed entries
  const agents: Omit<Agent, 'agent_id'>[] = [
    {
      call_sign: 'Joker',
      first_name: 'Ren',
      last_name: 'Amamiya',
      date_of_birth: '2000-01-01',
      agent_rank: 4,
    },
  ]
  const agentIds: { agent_id: number }[] = await knex('agents')
    .insert(agents)
    .returning('agent_id')

  const users: Omit<User, 'user_id'>[] = [
    {
      username: 'joker',
      hashed_password: await hashPassword('TakeYourHeart'),
      agent_id: agentIds[0]?.agent_id,
    },
    {
      username: 'test_user',
      hashed_password: await hashPassword('password'),
    },
    {
      username: 'corrupt_user',
      hashed_password: 'bad hash',
    },
  ]

  await knex('users').insert(users)
}
