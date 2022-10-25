import { Knex } from 'knex'
import { Region } from '../../models/region'
import { Location } from '../../models/location'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('regions').del()
  await knex('locations').del()

  // Inserts seed entries
  const regions: Omit<Region, 'regionId'>[] = [
    {
      name: 'England',
    },
  ]
  const regionIds: { regionId: number }[] = await knex('regions')
    .insert(regions)
    .returning('regionId')

  const locations: Omit<Location, 'locationId'>[] = [
    {
      siteName: 'MI6',
      location: 'London',
      timeZone: 'Europe/London',
      regionId: regionIds[0]?.regionId,
    },
  ]

  await knex('locations').insert(locations)
}
