const db = require('../models')
const Movies = db.Movies
const PAGE_LIMIT = 3
const PAGE_OFFSET = 0

const adminController = {
  getMovies: (req, res) => {
    try {
      Movies.findAndCountAll({ 
        raw: true, 
        nested: true ,
        limit: PAGE_LIMIT, 
        offset: PAGE_OFFSET
      }).then(movies => {
          return res.render('admin/movies', { movies })
      })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },

  getMovie: async (req, res) => {
    try{
      const movie = await Movies.findByPk(req.params.id)
      return res.render('admin/movie', { movie: movie.toJSON() })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },
  
  createMovie: (req, res) => {
    return res.render('admin/create')
  },

  postMovie: (req, res) => {
    try {
      const { title, description, release_date, image } = req.body
      Movies.create({
        title, 
        description, 
        release_date, 
        image, 
      }).then(movie => {
        return res.redirect('/admin/movies')
      })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },
}


module.exports = adminController