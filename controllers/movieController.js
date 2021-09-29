const db = require('../models')
const Movie = db.Movie
const Category = db.Category

const movieController = {
  getMovies: (req, res) => {
    try {
      Movie.findAll({ raw: true, nested: true, include: [Category]})
        .then(movies => {
          const data = movies.map(r => {
            r,
            r.description = r.description.substring(0, 50)
            r.title = r.title.substring(0, 30)
            return r
          })
          return res.render('movies', { movies: data })
        })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },
}

module.exports = movieController