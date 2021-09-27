const adminController = require('../controllers/adminController')
const movieController = require('../controllers/movieController')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController')
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
  app.get('/movies', authenticate, movieController.getMovies)

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


// 新增一筆分類	POST /admin/categories	categoryController.postCategory
// 瀏覽編輯分類的表單	GET /admin/categories/:id	categoryController.getCategories
// 更新一筆分類	PUT /admin/categories/:id	categoryController.putCategory
// 刪除一筆分類	DELETE /admin/categories/:id	categoryController.deleteCategory
