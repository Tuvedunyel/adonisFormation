import type { HttpContext } from '@adonisjs/core/http'
import MovieService from '#services/movie_service'
import { toHtml } from '@dimerapp/markdown/utils';

export default class MoviesController {
  async index({ view }: HttpContext) {
    const slugs = await MovieService.getSlug()
    const movies: Record<string, any>[] = []

    for (const slug of slugs) {
      const md = await MovieService.read(slug)

      movies.push({
        title: md.frontmatter.title,
        summary: md.frontmatter.summary,
        slug: slug.replace('.md', ''),
      })
    }

    return view.render('pages/home', { movies })
  }

  async show({ view, params }: HttpContext) {
    // view.share({
    //   title: 'My Awesome Movies !',
    //   subTitle: 'Bienvenue, venez visiter ma bibliothèque de super films.',
    // })
    const md = await MovieService.read(params.slug)

    const movie = toHtml(md).contents

    view.share({ movie, md })

    return view.render('pages/movies/show')
  }
}
