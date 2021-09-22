const db = require('../models')
const Movies = db.Movies
const PAGE_LIMIT = 90
const PAGE_OFFSET = 0

const adminController = {
  getMovies: async (req, res) => {
    try {
      const movies =  await Movies.findAndCountAll({ 
                        raw: true, 
                        nested: true ,
                        limit: PAGE_LIMIT, 
                        offset: PAGE_OFFSET
                      })
      return res.render('admin/movies', { movies })
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
        image
      }).then(movie => {
        return res.redirect('/admin/movies')
      })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },

  editMovie: async (req, res) => {
    try {
      const movies = await Movies.findByPk(req.params.id)
      return res.render('admin/create', { movies: movies.toJSON() })
    } catch(error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },

  putMovie: async (req, res) => {
    try {
      const { title, description, release_date, image } = req.body

      Movies.findByPk(req.params.id)
      .then((movies) => {
        movies.update({
          title, 
          description, 
          release_date, 
          image
        }).then(movies => {
          return res.redirect('/admin/movies')
        })
      })
    } catch(error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },
}


module.exports = adminController