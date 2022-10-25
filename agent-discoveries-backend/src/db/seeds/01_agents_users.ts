import { Knex } from 'knex'
import { Agent } from '../../models/agent'
import { User } from '../../models/user'
import { hashPassword } from '../../utils/crypto'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('agents').del()
  await knex('users').del()

  // Inserts seed entries
  const agents: Omit<Agent, 'agentId'>[] = [
    {
      callSign: 'Joker',
      firstName: 'Ren',
      lastName: 'Amamiya',
      dateOfBirth: '2000-01-01',
      agentRank: 4,
    },
  ]
  const agentIds: { agentId: number }[] = await knex('agents')
    .insert(agents)
    .returning('agentId')

  const users: Omit<User, 'userId'>[] = [
    {
      username: 'joker',
      hashedPassword: await hashPassword('TakeYourHeart'),
      agentId: agentIds[0]?.agentId,
    },
    {
      username: 'test_user',
      hashedPassword: await hashPassword('password'),
    },
    {
      username: 'corrupt_user',
      hashedPassword: 'bad hash',
    },
    {
      username: 'admin',
      hashedPassword: await hashPassword('password'),
    },
  ]

  await knex('users').insert(users)
}
