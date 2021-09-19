const db = require('../models')
const Movies = db.Movies

const adminController = {
  getMovies: (req, res) => {
    Movies.findAll({ raw: true, nested: true })
      .then(movies => {
        return res.render('admin/movies')
      })
  },
}

module.exports = adminController