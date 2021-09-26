const db = require('../models')
const Movie = db.Movie

const movieController = {
  getMovies: (req, res) => {
    try {
      Movie.findAll({ raw: true, nested: true })
        .then(movies => {
          return res.render('movies')
        })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },
}

module.exports = movieController