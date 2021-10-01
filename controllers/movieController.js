const db = require('../models');
const Movie = db.Movie;
const Category = db.Category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pageLimit = 8

const movieController = {
  getMovies: (req, res) => {
    try {
      let offset = 0
      if (req.query.page) {
        offset = (req.query.page - 1) * pageLimit
      }
      Movie.findAndCountAll({ 
        raw: true, 
        nested: true, 
        offset: offset, 
        limit: pageLimit,
        include: [Category]
      }).then(result => {
        const page = Number(req.query.page) || 1
        const pages = Math.ceil(result.count / pageLimit)
        const totalPage = Array.from({ length: pages })
        .map((item, index) => index + 1)
        const prev = page - 1 < 1 ? 1 : page - 1 
        const next = page + 1 > pages ? pages :  page + 1 
        const data = result.rows.map(r => {
          r,
          r.title = r.title.substring(0, 30)
          return r
        })
          Category.findAll({
            raw: true, 
            nest: true
          }).then(categories => {
            return res.render('movies', { 
              movies: data,
              categories,
              prev,
              next,
              page,
              totalPage
            })
          })
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
      return res.render('movies', { movies, keyword })
    }) 
  },
  getSort: (req, res) => {
    const type = req.params.type
    const method = req.params.method
    // const typeObj = { title: '名稱', release_date: '上映日期' }
    // const methodObj = { asc: 'A to Z', desc: 'Z to A'}
    const typeObj = { title: 'Title', release_date: 'Release_date' }
    const methodObj = { ASC: 'ASC', DESC: 'DESC'}
    const currentSelected = [`${ typeObj[type]}`, `${methodObj[method]}`]
    Movie.findAll({ 
      raw: true,
      nest: true,
      order: [currentSelected]
    }).then(movies => {
      return res.render('movies', { movies, currentSelected })
    })

  },
}

module.exports = movieController