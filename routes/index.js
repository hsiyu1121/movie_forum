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
  app.get('/admin/create', authenticateAdmin, adminController.createMovie)
  app.post('/admin/create', authenticateAdmin, adminController.postMovie)

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

// 取得新增餐廳的表單	GET /admin/restaurants/create	adminController.createRestaurant
// 新增一筆餐廳	POST /admin/restaurants	adminController.postRestaurant
// 瀏覽所有餐廳	GET /admin/restaurants	adminController.getRestaurants
// 瀏覽一筆餐廳	GET /admin/restaurants/:id	adminController.getRestaurant
// 取得更新餐廳的表單	GET /admin/restaurants/:id/edit	adminController.editRestaurant
// 更新一筆餐廳	PUT /admin/restaurants/:id	adminController.putRestaurant
// 移除一筆餐廳	DELETE /admin/restaurants/:id	adminController.deleteRestaurant