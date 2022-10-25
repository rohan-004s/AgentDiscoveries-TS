import { Knex } from 'knex'
import { Region } from '../../models/region'
import { Location } from '../../models/location'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('regions').del()
  await knex('locations').del()

  // Inserts seed entries
  const regions: Omit<Region, 'region_id'>[] = [
    {
      name: 'England',
    },
  ]
  const regionIds: { region_id: number }[] = await knex('regions')
    .insert(regions)
    .returning('region_id')

  const locations: Omit<Location, 'location_id'>[] = [
    {
      site_name: 'MI6',
      location: 'London',
      time_zone: 'Europe/London',
      region_id: regionIds[0]?.region_id,
    },
  ]

  await knex('locations').insert(locations)
}
