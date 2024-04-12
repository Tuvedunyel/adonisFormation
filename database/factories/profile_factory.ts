import factory from '@adonisjs/lucid/factories'
import Profile from '#models/profile'
import { UserFactory } from '#database/factories/user_factory'

export const ProfileFactory = factory
  .define(Profile, async ({ faker }) => {
    return {
      userId: 1,
      description: faker.lorem.paragraph(),
    }
  })
  .relation('user', () => UserFactory)
  .build()
