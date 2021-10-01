const adminController = require('../controllers/adminController')
const movieController = require('../controllers/movieController')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController')
const commentController = require('../controllers/commentController')
const passport = require('passport');
const multer = require('multer')
const upload = multer({ dest: 'temp/'})


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
  
  app.get('/search', authenticate, movieController.getSearch)
  app.get('/sort/:type/:method', authenticate, movieController.getSort)
  app.post('/comments', authenticate, commentController.postComment)

  app.get('/movies', authenticate, movieController.getMovies)
  app.get('/movies/:id', authenticate, movieController.getMovie)

  app.get('/admin', (req, res) => { res.redirect('/admin/movies') })
  app.get('/admin/create', authenticateAdmin, adminController.createMovie)
  app.post('/admin/create', authenticateAdmin, upload.single('image'), adminController.postMovie)
  app.get('/admin/movies', authenticateAdmin, adminController.getMovies)
  app.get('/admin/movies/:id', authenticateAdmin, adminController.getMovie)
  app.get('/admin/movies/:id/edit', authenticateAdmin, adminController.editMovie)
  app.put('/admin/movies/:id', authenticateAdmin, upload.single('image'), adminController.putMovie)
  app.delete('/admin/movies/:id', authenticateAdmin, adminController.deleteMovie)

  app.get('/admin/categories', authenticateAdmin, categoryController.getCategories)
  app.post('/admin/categories', authenticateAdmin, categoryController.postCategory)
  app.get('/admin/categories/:id', authenticateAdmin, categoryController.getCategories)
  app.put('/admin/categories/:id', authenticateAdmin, categoryController.putCategory)
  app.delete('/admin/categories/:id', authenticateAdmin, categoryController.deleteCategory)

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
