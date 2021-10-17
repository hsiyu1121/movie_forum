const db = require("../models");
const Movie = db.Movie;
const User = db.User;
const Comment = db.Comment;
const Category = db.Category;
const Favorite = db.Favorite;
const Like = db.Like;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const pageLimit = 8;

const movieController = {
  getMovies: (req, res) => {
    try {
      let offset = 0;
      if (req.query.page) {
        offset = (req.query.page - 1) * pageLimit;
      }
      Movie.findAndCountAll({
        raw: true,
        nested: true,
        offset: offset,
        limit: pageLimit,
        include: [Category],
      }).then((result) => {
        const page = Number(req.query.page) || 1;
        const pages = Math.ceil(result.count / pageLimit);
        const totalPage = Array.from({ length: pages }).map(
          (item, index) => index + 1
        );
        const prev = page - 1 < 1 ? 1 : page - 1;
        const next = page + 1 > pages ? pages : page + 1;
        const data = result.rows.map((r) => ({
          ...r,
          isFavorite: req.user.FavoritedMovies.map((d) => d.id).includes(r.id),
          isLike: req.user.LikedMovies.map((d) => d.id).includes(r.id),
        }));
        Category.findAll({
          raw: true,
          nest: true,
        }).then((categories) => {
          return res.render("movies", {
            movies: data,
            categories,
            prev,
            next,
            page,
            totalPage,
          });
        });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },
  getMovie: (req, res) => {
    try {
      Movie.findByPk(req.params.id, {
        include: [
          Category,
          { model: User, as: "FavoritedUsers" },
          { model: User, as: "LikedUsers" },
          { model: Comment, include: [User] },
        ],
      }).then((movie) => {
        movie.increment("viewCounts", { by: 1 }).then((movie) => {
          const isFavorite = movie.FavoritedUsers.map((d) => d.id).includes(
            req.user.id
          );
          const isLike = movie.LikedUsers.map((d) => d.id).includes(
            req.user.id
          );
          const lenFavorite = movie.FavoritedUsers.map((d) => d.UserId);
          const lenLike = movie.LikedUsers.map((d) => d.UserId);
          return res.render("movie", {
            movie,
            isFavorite,
            isLike,
            lenFavorite,
            lenLike,
          });
        });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },
  getSearch: (req, res) => {
    try {
      let { keyword } = req.query;
      keyword = keyword.toLowerCase().trim();

      Movie.findAll({
        raw: true,
        nest: true,
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword}%` } },
            { description: { [Op.like]: `%${keyword}%` } },
          ],
        },
      }).then((movies) => {
        return res.render("movies", { movies, keyword });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },
  getSort: (req, res) => {
    try {
      const type = req.params.type;
      const method = req.params.method;
      const typeObj = { title: "Title", release_date: "Release_date" };
      const methodObj = { ASC: "ASC", DESC: "DESC" };
      const currentSelected = [`${typeObj[type]}`, `${methodObj[method]}`];
      Movie.findAll({
        raw: true,
        nest: true,
        order: [currentSelected],
      }).then((movies) => {
        return res.render("movies", { movies, currentSelected });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },
  getTopMovies: (req, res) => {
    return Movie.findAll({
      order: [["viewCounts", "DESC"]],
      limit: 10,
      include: [{ model: User, as: "FavoritedUsers" }],
    }).then((movies) => {
      movies = movies.map((movie) => ({
        ...movie.dataValues,
        FavoriteCount: movie.FavoritedUsers.length,
        isFavorited: req.user.FavoritedMovies.map((d) => d.id).includes(
          movie.id
        ),
      }));
      movies = movies.sort((a, b) => b.viewCounts - a.viewCounts);
      return res.render("topMovie", { movies });
    });
  },
  getFeeds: (req, res) => {
    Movie.findAll({
      raw: true,
      nest: true,
      order: [["createdAt", "DESC"]],
      include: [Category],
      limit: 10,
    }).then((movies) => {
      Comment.findAll({
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],
        include: [User, Movie],
        limit: 15,
      }).then((comment) => {
        return res.render("feeds", { movies, comment });
      });
    });
  },
};

module.exports = movieController;
