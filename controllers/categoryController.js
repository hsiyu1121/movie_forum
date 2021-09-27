const db = require('../models')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    try {
      Category.findAll({ raw: true, nest: true })
      .then(categories => {
        return res.render('admin/categories', { categories })
      })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
    
  }, 
  postCategory: (req, res) => {
    try {
      const { name } = req.body
      Category.create({ name })
      .then(category => {
        return res.redirect('/admin/categories')
      })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  }, 
  // getCategories: (req, res) => {}, 
  // putCategory: (req, res) => {}, 
  // deleteCategory: (req, res) => {}
}

module.exports = categoryController