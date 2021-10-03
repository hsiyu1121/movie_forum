const db = require('../models')
const Comment = db.Comment

const commentController = {
  postComment: (req, res) => {
    try {
      return Comment.create({
        text: req.body.text,
        UserId: req.user.id,
        MovieId: req.body.movieId
      }).then((comment) => {
        res.redirect(`/movies/${req.body.movieId}`)
      })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },
  deleteComment: (req, res) => {
    try {
      return Comment.findByPk(req.params.id)
        .then((comment) => {
          comment.destroy()
            .then(comment => {
              res.redirect(`/movies/${comment.MovieId}`)
            })
        })
    } catch (error) {
      req.flash('error_msg', error.toString())
      return res.status(500).redirect('back')
    }
  },

}

module.exports = commentController