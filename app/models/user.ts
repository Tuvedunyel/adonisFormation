import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
// import MovieService from '#services/movie_service'
// import cache from '#services/cache_service'
// import { toHtml } from '@dimerapp/markdown/utils'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roleId: number

  @column()
  declare fullName: string | null

  @column()
  declare avatarUrl: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // static async all() {
  //   const slugs = await MovieService.getSlug()
  //
  //   const movies: Movie[] = []
  //
  //   for (const slug of slugs) {
  //     const movie = await this.find(slug)
  //
  //     movies.push(movie)
  //   }
  //
  //   return movies
  // }
  //
  // static async find(slug: string) {
  //   if (cache.has(slug)) {
  //     console.log(`Cache hit: ${slug}`)
  //     return cache.get(slug)
  //   }
  //   const md = await MovieService.read(slug)
  //
  //   const movie = new Movie()
  //
  //   movie.title = md.frontmatter.title
  //
  //   movie.slug = slug
  //
  //   movie.summary = md.frontmatter.summary
  //
  //   movie.abstract = toHtml(md).contents
  //
  //   cache.set(slug, movie)
  //
  //   return movie
  // }
}
