const db = require('../models')
const Movies = db.Movies
const PAGE_LIMIT = 3
const PAGE_OFFSET = 0

const adminController = {
  getMovies: (req, res) => {
    Movies.findAndCountAll({ 
      raw: true, 
      nested: true ,
      limit: PAGE_LIMIT, 
      offset: PAGE_OFFSET
    }).then(movies => {
        console.log(movies)
        return res.render('admin/movies', { movies })
      })
  },
}

module.exports = adminController