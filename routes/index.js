const adminController = require('../controllers/adminController')
const movieController = require('../controllers/movieController')
const userController = require('../controllers/userController')
const passport = require('passport');


module.exports = (app, passport) => {
  const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/signin')
  }
  const authenticateAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if(req.user.role) { return next() }
      return res.redirect('/')
    }
    return res.redirect('/signin')
  }

  app.get('/', (req, res) => { res.redirect('/movies') })
  app.get('/movies', authenticate, movieController.getMovies)

  app.get('/admin', (req, res) => { res.redirect('/admin/movies') })
  app.get('/admin/movies', authenticateAdmin, adminController.getMovies)

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