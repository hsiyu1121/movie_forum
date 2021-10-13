const db = require("../models");
const Movie = db.Movie;
const Category = db.Category;
const multer = require("multer");
const upload = multer({ dest: "temp/" });
const imgur = require("imgur-node-api");
const IMGUR_CLIENT = process.env.IMGUR_CLIENT;

const adminController = {
  getMovies: (req, res) => {
    try {
      Movie.findAndCountAll({
        raw: true,
        nest: true,
        order: [["id", "DESC"]],
        include: [Category],
      }).then((movies) => {
        return res.render("admin/movies", { movies });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },

  getMovie: (req, res) => {
    try {
      Movie.findByPk(req.params.id, { include: [Category] }).then((movie) => {
        return res.render("admin/movie", { movie: movie.toJSON() });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },

  createMovie: (req, res) => {
    try {
      Category.findAll({ raw: true, nest: true }).then((categories) => {
        return res.render("admin/create", { categories });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },

  postMovie: (req, res) => {
    const { title, description, release_date, image } = req.body;
    try {
      if (!title) {
        req.flash("error_msg", "name didn't exist");
        return res.redirect("back");
      }

      const { file } = req;
      if (file) {
        imgur.setClientID(IMGUR_CLIENT);
        imgur.upload(file.path, (err, img) => {
          return Movie.create({
            title,
            description,
            release_date,
            CategoryId: req.body.categoryId,
            image: file ? img.data.link : null,
          }).then((movie) => {
            req.flash("success_msg", "資料成功建立");
            return res.redirect("/admin/movies");
          });
        });
      } else {
        return Movie.create({
          title,
          description,
          release_date,
          CategoryId: req.body.categoryId,
          image: null,
        }).then((movie) => {
          req.flash("success_msg", "資料成功建立");
          return res.redirect("/admin/movies");
        });
      }
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },

  editMovie: (req, res) => {
    try {
      Category.findAll({ raw: true, nest: true }).then((categories) => {
        Movie.findByPk(req.params.id, { raw: true }).then((movies) => {
          return res.render("admin/create", { movies, categories });
        });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },

  putMovie: (req, res) => {
    const { title, description, release_date, image } = req.body;

    try {
      if (!title) {
        req.flash("error_msg", "title did't exist");
        return res.redirect("back");
      }

      const { file } = req;
      if (file) {
        imgur.setClientID(IMGUR_CLIENT);
        imgur.upload(file.path, (err, img) => {
          return Movie.findByPk(req.params.id).then((movie) => {
            movie
              .update({
                title,
                description,
                release_date,
                CategoryId: req.body.categoryId,
                image: file ? img.data.link : movie.image,
              })
              .then((movie) => {
                req.flash("success_msg", "資料成功更新");
                return res.redirect("/admin/movies");
              });
          });
        });
      } else {
        return Movie.findByPk(req.params.id).then((movie) => {
          movie
            .update({
              title,
              description,
              release_date,
              CategoryId: req.body.categoryId,
              image: null,
            })
            .then((movie) => {
              req.flash("success_msg", "資料成功更新");
              return res.redirect("/admin/movies");
            });
        });
      }
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },

  deleteMovie: (req, res) => {
    try {
      Movie.findByPk(req.params.id).then((movie) => {
        movie.destroy().then((movie) => {
          return res.redirect("/admin/movies");
        });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },
};

module.exports = adminController;
