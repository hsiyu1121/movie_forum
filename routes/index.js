const adminController = require('../controllers/adminController')
const movieController = require('../controllers/movieController')
const userController = require('../controllers/userController')
const passport = require('passport');

module.exports = (app) => {
  app.get('/', (req, res) => { res.redirect('/movies') })
  app.get('/movies', movieController.getMovies)

  app.get('/admin', (req, res) => { res.redirect('/admin/movies') })
  app.get('/admin/movies', adminController.getMovies)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true }), 
    userController.signIn 
  )
  app.get('/logout', userController.logout)
}