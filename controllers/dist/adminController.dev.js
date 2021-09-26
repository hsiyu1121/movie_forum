"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var db = require('../models');

var Movie = db.Movie;
var Category = db.Category;
var PAGE_LIMIT = 3;
var PAGE_OFFSET = 0;

var fs = require('fs');

var multer = require('multer');

var upload = multer({
  dest: 'temp/'
});

var imgur = require('imgur-node-api');

var IMGUR_CLIENT = process.env.IMGUR_CLIENT;
var adminController = {
  getMovies: function getMovies(req, res) {
    var movies;
    return regeneratorRuntime.async(function getMovies$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Movie.findAndCountAll({
              raw: true,
              nested: true,
              limit: PAGE_LIMIT,
              offset: PAGE_OFFSET,
              order: [['id', 'DESC']]
            }));

          case 3:
            movies = _context.sent;
            return _context.abrupt("return", res.render('admin/movies', {
              movies: movies
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            req.flash('error_msg', _context.t0.toString());
            return _context.abrupt("return", res.status(500).redirect('back'));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  getMovie: function getMovie(req, res) {
    var movie;
    return regeneratorRuntime.async(function getMovie$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(Movie.findByPk(req.params.id));

          case 3:
            movie = _context2.sent;
            return _context2.abrupt("return", res.render('admin/movie', {
              movie: movie.toJSON()
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            req.flash('error_msg', _context2.t0.toString());
            return _context2.abrupt("return", res.status(500).redirect('back'));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  createMovie: function createMovie(req, res) {
    return res.render('admin/create');
  },
  postMovie: function postMovie(req, res) {
    var _req$body = req.body,
        title = _req$body.title,
        description = _req$body.description,
        release_date = _req$body.release_date,
        image = _req$body.image;

    try {
      if (!title) {
        req.flash('error_msg', 'name didn\'t exist');
        return res.redirect('back');
      }

      var file = req.file;

      if (file) {
        imgur.setClientID(IMGUR_CLIENT);
        imgur.upload(file.path, function (err, img) {
          return Movie.create({
            title: title,
            description: description,
            release_date: release_date,
            image: file ? img.data.link : null
          }).then(function (movie) {
            req.flash('success_msg', '資料成功建立');
            return res.redirect('/admin/movies');
          });
        });
      } else {
        return Movie.create({
          title: title,
          description: description,
          release_date: release_date,
          image: null
        }).then(function (movie) {
          req.flash('success_msg', '資料成功建立');
          return res.redirect('/admin/movies');
        });
      }
    } catch (error) {
      req.flash('error_msg', error.toString());
      return res.status(500).redirect('back');
    }
  },
  editMovie: function editMovie(req, res) {
    var _ref, _ref2, movies, categories;

    return regeneratorRuntime.async(function editMovie$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(Promise.all([Movie.findByPk(req.params.id, {
              raw: true
            }), Category.findAll({
              raw: true,
              nest: true
            })]));

          case 3:
            _ref = _context3.sent;
            _ref2 = _slicedToArray(_ref, 2);
            movies = _ref2[0];
            categories = _ref2[1];
            return _context3.abrupt("return", res.render('admin/create', {
              movies: movies,
              categories: categories
            }));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            req.flash('error_msg', _context3.t0.toString());
            return _context3.abrupt("return", res.status(500).redirect('back'));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  putMovie: function putMovie(req, res) {
    var _req$body2, title, description, release_date, image, file;

    return regeneratorRuntime.async(function putMovie$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, release_date = _req$body2.release_date, image = _req$body2.image;
            _context4.prev = 1;

            if (title) {
              _context4.next = 5;
              break;
            }

            req.flash('error_msg', 'title did\'t exist');
            return _context4.abrupt("return", res.redirect('back'));

          case 5:
            file = req.file;

            if (!file) {
              _context4.next = 11;
              break;
            }

            imgur.setClientID(IMGUR_CLIENT);
            imgur.upload(file.path, function (err, img) {
              return Movie.findByPk(req.params.id).then(function (movie) {
                movie.update({
                  title: title,
                  description: description,
                  release_date: release_date,
                  image: file ? img.data.link : movie.image
                }).then(function (movie) {
                  req.flash('success_msg', '資料成功更新');
                  return res.redirect('/admin/movies');
                });
              });
            });
            _context4.next = 12;
            break;

          case 11:
            return _context4.abrupt("return", Movie.findByPk(req.params.id).then(function (movie) {
              movie.update({
                title: title,
                description: description,
                release_date: release_date,
                image: null
              }).then(function (movie) {
                req.flash('success_msg', '資料成功更新');
                return res.redirect('/admin/movies');
              });
            }));

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](1);
            req.flash('error_msg', _context4.t0.toString());
            return _context4.abrupt("return", res.status(500).redirect('back'));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 14]]);
  },
  deleteMovie: function deleteMovie(req, res) {
    try {
      Movie.findByPk(req.params.id).then(function (movie) {
        movie.destroy().then(function (movie) {
          return res.redirect('/admin/movies');
        });
      });
    } catch (error) {
      req.flash('error_msg', error.toString());
      return res.status(500).redirect('back');
    }
  }
};
module.exports = adminController;