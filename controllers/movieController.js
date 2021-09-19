const db = require('../models')
const Movies = db.Movies

const movieController = {
  getMovies: (req, res) => {
    Movies.findAll({ raw: true, nested: true })
      .then(movies => {
        return res.render('movies')
      })
  },
}

module.exports = movieController