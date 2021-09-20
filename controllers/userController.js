const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res) => {
    const {name, email, password, confirmPassword, role} = req.body
    if ( !name || !email || !password || !confirmPassword ) {
      return res.redirect('/signup')
    }
    if(password !== confirmPassword ) {
      return res.redirect('/signup')
    } else {
      User.findOne({ where: { email }})
        .then(user => {
          if(user) {
            return res.redirect('/signup')
          } else {
            User.create({
              name, 
              email, 
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null), 
              role: 0
            }).then(user => {
              return res.redirect('/signin')
            })
          }
        })     
    } 
  },
}

module.exports = userController