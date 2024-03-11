import type { HttpContext } from '@adonisjs/core/http'

import Movie from '#models/movie'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies = await Movie.all()

    return view.render('pages/home', { movies })
  }

  async show({ view, params }: HttpContext) {
    // view.share({
    //   title: 'My Awesome Movies !',
    //   subTitle: 'Bienvenue, venez visiter ma bibliothèque de super films.',
    // })

    const movie = await Movie.find(params.slug)

    view.share({ movie })

    return view.render('pages/movies/show')
  }
}
