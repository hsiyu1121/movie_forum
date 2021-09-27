const db = require('../models')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    try {
      Category.findAll({ raw: true, nest: true })
      .then(categories => {
        if (req.params.id) {
          Category.findByPk(req.params.id)
          .then(category => {
            return res.render('admin/categories', { 
              categories, 
              category: category.toJSON() 
            })
          })
        } else {
           return res.render('admin/categories', { categories })
        }
      })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  }, 
  postCategory: (req, res) => {
    try {
      const { name } = req.body
      if (!name) {
        req.flash('error_msg', 'name didn\'t exist!')
        return res.redirect('back')
      }

      Category.create({ name })
      .then(category => {
        return res.redirect('/admin/categories')
      })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  }, 
  putCategory: (req, res) => {
    try {
      const { name } = req.body
      if (!name) {
        req.flash('error_msg', 'name didn\'t exist!')
        return res.redirect('back')
      }
      Category.findByPk(req.params.id)   
      .then(category => {
        category.update({ name })
        .then(category => {
          return res.redirect('/admin/categories')
        })
      })

    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }

  }, 
  // deleteCategory: (req, res) => {}
}

module.exports = categoryController