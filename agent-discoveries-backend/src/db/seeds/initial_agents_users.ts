import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('agents').del()
  await knex('users').del()

  // Inserts seed entries
  await knex('agents').insert([
    {
      call_sign: 'Joker',
      first_name: 'Ren',
      last_name: 'Amamiya',
      date_of_birth: '2000-01-01',
      agent_rank: 4,
    },
  ])
}
