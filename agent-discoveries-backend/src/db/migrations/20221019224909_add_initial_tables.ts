import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Agents and Users
  await knex.schema.createTable('agents', (table) => {
    table.increments('agent_id').primary()
    table.string('call_sign').notNullable().unique()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.date('date_of_birth').notNullable()
    table.integer('agent_rank').notNullable()
  })

  await knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary()
    table.string('username').notNullable().unique()
    table.string('hashed_password').notNullable()
    table
      .integer('agent_id')
      .references('agents.agent_id')
      .onDelete('SET NULL')
  })

  // Regions and Locations
  await knex.schema.createTable('regions', (table) => {
    table.increments('region_id').primary()
    table.string('name').notNullable()
  })

  await knex.schema.createTable('locations', (table) => {
    table.increments('location_id').primary()
    table.string('site_name').notNullable()
    table.string('location').notNullable()
    table.string('time_zone').notNullable()
    table
      .integer('region_id')
      .references('regions.region_id')
      .onDelete('SET NULL')
  })

  // Reports
  await knex.schema.createTable('location_reports', (table) => {
    table.increments('report_id').primary()
    table.integer('location_id').references('locations.location_id')
    table.integer('region_id').references('regions.region_id')
    table.integer('agent_id').references('agents.agent_id')
    table.smallint('status').notNullable()
    table.datetime('report_time').notNullable()
    table.text('report_body').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('location_reports')
  await knex.schema.dropTableIfExists('locations')
  await knex.schema.dropTableIfExists('regions')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('agents')
}
