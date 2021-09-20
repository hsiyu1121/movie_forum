const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

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
}

module.exports = userController