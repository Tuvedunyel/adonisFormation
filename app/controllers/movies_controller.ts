import type { HttpContext } from '@adonisjs/core/http'

import Movie from '#models/movie'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const comingSoon = await Movie.query()
      .apply((scope) => scope.notReleased())
      .whereNotNull('releasedAt')
      .orderBy('releasedAt')
      .limit(3)

    const recentlyReleased = await Movie.query()
      .apply((scope) => scope.released())
      .orderBy('releasedAt', 'desc')
      .limit(5)
      .limit(9)

    return view.render('pages/home', { comingSoon, recentlyReleased })
  }

  async show({ view, params }: HttpContext) {
    // view.share({
    //   title: 'My Awesome Movies !',
    //   subTitle: 'Bienvenue, venez visiter ma bibliothèque de super films.',
    // })

    // const movie = await Movie.find(params.id)
    const movie = await Movie.findByOrFail('slug', params.slug)

    view.share({ movie })

    return view.render('pages/movies/show')
  }
}
