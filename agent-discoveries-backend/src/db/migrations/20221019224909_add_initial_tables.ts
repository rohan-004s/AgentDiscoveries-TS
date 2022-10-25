import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Agents and Users
  await knex.schema.createTable('agents', (table) => {
    table.increments('agentId').primary()
    table.string('callSign').notNullable().unique()
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.date('dateOfBirth').notNullable()
    table.integer('agentRank').notNullable()
  })

  await knex.schema.createTable('users', (table) => {
    table.increments('userId').primary()
    table.string('username').notNullable().unique()
    table.string('hashedPassword').notNullable()
    table
      .integer('agentId')
      .references('agents.agentId')
      .onDelete('SET NULL')
  })

  // Regions and Locations
  await knex.schema.createTable('regions', (table) => {
    table.increments('regionId').primary()
    table.string('name').notNullable()
  })

  await knex.schema.createTable('locations', (table) => {
    table.increments('locationId').primary()
    table.string('siteName').notNullable()
    table.string('location').notNullable()
    table.string('timeZone').notNullable()
    table
      .integer('regionId')
      .references('regions.regionId')
      .onDelete('SET NULL')
  })

  // Reports
  await knex.schema.createTable('locationReports', (table) => {
    table.increments('reportId').primary()
    table.integer('locationId').references('locations.locationId')
    table.integer('regionId').references('regions.regionId')
    table.integer('agentId').references('agents.agentId')
    table.smallint('status').notNullable()
    table.datetime('reportTime').notNullable()
    table.text('reportBody').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('locationReports')
  await knex.schema.dropTableIfExists('locations')
  await knex.schema.dropTableIfExists('regions')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('agents')
}
