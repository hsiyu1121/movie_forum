const adminController = require('../controllers/adminController')
const movieController = require('../controllers/movieController')
const userController = require('../controllers/userController')

module.exports = (app) => {
  app.get('/', (req, res) => { res.redirect('/movies') })
  app.get('/movies', movieController.getMovies)

  app.get('/admin', (req, res) => { res.redirect('/admin/movies') })
  app.get('/admin/movies', adminController.getMovies)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
}