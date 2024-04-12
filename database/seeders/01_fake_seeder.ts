import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { CineastFactory } from '#database/factories/cineast_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { DateTime } from 'luxon'
import { movies } from '#database/data/movie'
import { UserFactory } from '#database/factories/user_factory'
import MovieStatuses from '#enums/movie_statuses'
import Cineast from '#models/cineast'

export default class extends BaseSeeder {
  static environments = ['development', 'testing']

  async run() {
    const cineasts = await CineastFactory.createMany(20)
    await UserFactory.with('profile').createMany(5)
    await this.#createMovies(cineasts)
  }

  async #createMovies(cineasts: Cineast[]) {
    let index = 0
    await MovieFactory.tap((row, { faker }) => {
      const movie = movies[index]
      const released = DateTime.now().set({ year: movie.releaseYear })

      row.title = movie.title
      row.directorId = cineasts.at(Math.floor(Math.random() * cineasts.length))!.id
      row.writerId = cineasts.at(Math.floor(Math.random() * cineasts.length))!.id
      row.statusId = MovieStatuses.RELEASED
      row.releasedAt = DateTime.fromJSDate(
        faker.date.between({
          from: released.startOf('year').toJSDate(),
          to: released.endOf('year').toJSDate(),
        })
      )
      index++
    }).createMany(movies.length)

    await MovieFactory.with('director').with('writer').createMany(3)
    await MovieFactory.with('director').with('writer').apply('released').createMany(2)
    await MovieFactory.with('director').with('writer').apply('releasingSoon').createMany(2)
    await MovieFactory.with('director').with('writer').apply('postProduction').createMany(2)
  }
}
