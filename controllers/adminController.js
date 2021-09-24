const db = require('../models')
const Movies = db.Movies
const PAGE_LIMIT = 3
const PAGE_OFFSET = 0
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })


const adminController = {
  getMovies: async (req, res) => {
    try {
      const movies =  await Movies.findAndCountAll({ 
                        raw: true, 
                        nested: true ,
                        limit: PAGE_LIMIT, 
                        offset: PAGE_OFFSET,
                        order: [['id', 'DESC']]
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
    const { title, description, release_date, image } = req.body
    try {
      if ( !title ) {
        req.flash('error_msg', 'name didn\'t exist')
        return res.redirect('back')
      }

      const { file } = req
      if (file) {
        fs.readFile(file.path, (err, data) => {
          if(err) console.log('Error', err)
          fs.writeFile(`upload/${file.originalname}`, data, () => {
            return  Movies.create({
                      title, 
                      description, 
                      release_date, 
                      image: file ? `upload/${file.originalname}`: null
                    }).then(movie => {
                        req.flash('success_msg', '資料成功建立')
                        return res.redirect('/admin/movies')
                    })
          })
        })
      } else {
        return  Movies.create({
                    title, 
                    description, 
                    release_date, 
                    image: null
        }).then(movie => {
          req.flash('success_msg', '資料成功建立')
          return res.redirect('/admin/movies')
        })
      }
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
    const { title, description, release_date, image } = req.body

    try {
      if(!title) {
        req.flash('error_msg', 'title did\'t exist')
        return res.redirect('back')
      }

      const { file } = req
      if(file) {
        fs.readFile(file.path, (err, data) => {
          if (err) console.log('Error', err)
          fs.writeFile(`upload/${file.originalname}`, data, () => {
            return Movies.findByPk(req.params.id)
                  .then(movie => {
                    movie.update({
                      title, 
                      description, 
                      release_date, 
                      image: file ? `upload/${file.originalname}`: movie.image
                    }).then(movie => {
                      req.flash('success_msg', '資料成功更新')
                      return res.redirect('/admin/movies')
                    })
                  })
          })
        })
  
      } else {
        return Movies.findByPk(req.params.id)
        .then(movie => {
          movie.update({
            title, 
            description, 
            release_date, 
            image: movie.image
          }).then(movie => {
            req.flash('success_msg', '資料成功更新')
            return res.redirect('/admin/movies')
          })
        })
      }
    } catch(error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    } 
  },

  deleteMovie: (req, res) => {
    try {
      Movies.findByPk(req.params.id)
      .then(movie => {
        movie.destroy()
        .then(movie => {
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