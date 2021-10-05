const db = require('../models')
const User = db.User
const Comment = db.Comment
const Movie = db.Movie
const Favorite = db.Favorite
const bcrypt = require('bcryptjs')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const imgur = require('imgur-node-api')
const IMGUR_CLIENT = process.env.IMGUR_CLIENT

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res) => {
    try {
      const {name, email, password, confirmPassword, role} = req.body
      if ( !name || !email || !password || !confirmPassword ) {
        req.flash('error_msg', '所有欄位都必須填寫')
        return res.redirect('/signup')
      }
      if(password !== confirmPassword ) {
        req.flash('error_msg', '密碼和確認密碼錯誤')
        return res.redirect('/signup')
      } else {
        User.findOne({ where: { email }})
          .then(user => {
            if(user) {
              req.flash('error_msg', 'email已註冊')
              return res.redirect('/signup')
            } else {
              User.create({
                name, 
                email, 
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null), 
                role: 0
              }).then(user => {
                req.flash('success_msg', '註冊成功')
                return res.redirect('/signin')
              })
            }
          })     
      } 
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    } 
  },
  signInPage: (req, res) => {
    return res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_msg', '成功登入')
    res.redirect('/movies')
  },
  logout: (req, res) => {
    req.flash('success_msg', '成功登出')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res) => {
    try {
      User.findByPk(req.params.id, {
        include:[
          {model: Comment, include:[Movie]}
        ]
      })
      .then(user => {
        let result = new Set();
        let arr = []
        user.Comments.forEach(item => {
          if (!result.has(item.MovieId)) {
            result.add(item.MovieId)
            arr.push(result)
          }
        })
        return res.render('profile', { 
          user: user.toJSON(),
          len: arr.length
        })
      })

    } catch(error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },
  editUser: (req, res) => {
    try {
      User.findByPk(req.params.id, { raw: true })
      .then(user => {
        return res.render('editProfile', { user })
      })
    } catch(error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },
  putUser: (req, res) => {
    if (!req.body.name) {
      req.flash('error_msg', "name didn\'t exist!!")
      res.redirect('back')
    }

    const { file } = req

    if (file) {
      imgur.setClientID(IMGUR_CLIENT)
      imgur.upload(file.path, (err, img) => {
          return User.findByPk(req.params.id)
            .then(user => {
              user.update({
                name: req.body.name, 
                image: file ? img.data.link : user.image
              })
            .then(user => {
              req.flash('success_msg', 'user was successfully to update')
              res.redirect(`/users/${user.id}`)
            })
          })
      })
    } else {
      return User.findByPk(req.params.id)
        .then(user => {
          user.update({
            name: req.body.name, 
            image: user.image
          })
        .then(user => {
          req.flash('success_msg', 'user was successfully to update')
          res.redirect(`/users/${user.id}`)
        })
      })
    }
  },
  addFavorite: (req, res) => {
    return Favorite.create({
      UserId: req.user.id, 
      MovieId: req.params.movieId,
    }).then(favorite => {
      return res.redirect('back')
    })
  },
  removeFavorite: (req, res) => {
     return Favorite.findOne({
      where: {
        UserId: req.user.id, 
        MovieId: req.params.movieId,
      }
    }).then(favorite => {
      favorite.destroy()
        .then(favorite => {
          return res.redirect('back')
        })
    })
  },


}

module.exports = userController
