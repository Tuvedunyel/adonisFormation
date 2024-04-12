import factory from '@adonisjs/lucid/factories'
import Cineast from '#models/cineast'
import { MovieFactory } from '#database/factories/movie_factory'

export const CineastFactory = factory
  .define(Cineast, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      headshotUrl: faker.image.avatar(),
    }
  })
  .relation('moviesDirected', () => MovieFactory)
  .relation('moviesWritten', () => MovieFactory)
  .build()
