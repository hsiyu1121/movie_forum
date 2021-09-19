const adminController = require('../controllers/adminController')
const movieController = require('../controllers/movieController')


module.exports = (app) => {
  app.get('/', (req, res) => { res.redirect('/movies') })
  app.get('/movies', movieController.getMovies)

  app.get('/admin', (req, res) => { res.redirect('/admin/movies') })
  app.get('/admin/movies', adminController.getMovies)
}