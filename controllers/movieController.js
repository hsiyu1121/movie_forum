const db = require('../models');
const Movie = db.Movie;
const Category = db.Category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
  getMovie: (req, res) => {
    try {
      Movie.findByPk(req.params.id, { include: Category })
        .then(movie => {
          return res.render('movie', { movie })
        })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }

  },
  getSearch: (req, res) => {
    let { keyword } = req.query
    keyword = keyword.toLowerCase().trim()
    
    Movie.findAll({ 
      raw: true, 
      nest: true, 
      where: {
              [Op.or]: [
                        { title: { [Op.like]: `%${keyword}%`} },
                        { description: {[Op.like]: `%${keyword}%` } }
                      ]
      }
    }).then(movies => {
      console.log(req.query)
      return res.render('movies', { movies, keyword })
    }) 

   

    //======================================
    // let { keyword } = req.query
    // keyword = keyword.toLowerCase().trim()
    // Movie.findAll({ 
    //   raw: true, 
    //   nest: true, 
    //   where: {
    //     title: { [Op.like]: '%' + keyword + '%'}        
    //   }
    // }).then(movies => {
    //   return res.render('movies', { movies, keyword })
    // }) 
  },
}

module.exports = movieController