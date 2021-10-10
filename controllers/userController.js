const db = require("../models");
const User = db.User;
const Comment = db.Comment;
const Movie = db.Movie;
const Favorite = db.Favorite;
const Like = db.Like;
const Followship = db.Followship;
const bcrypt = require("bcryptjs");
const multer = require("multer");
const upload = multer({ dest: "temp/" });
const imgur = require("imgur-node-api");
const IMGUR_CLIENT = process.env.IMGUR_CLIENT;

const userController = {
  signUpPage: (req, res) => {
    return res.render("signup");
  },
  signUp: (req, res) => {
    try {
      const { name, email, password, confirmPassword, role } = req.body;
      if (!name || !email || !password || !confirmPassword) {
        req.flash("error_msg", "所有欄位都必須填寫");
        return res.redirect("/signup");
      }
      if (password !== confirmPassword) {
        req.flash("error_msg", "密碼和確認密碼錯誤");
        return res.redirect("/signup");
      } else {
        User.findOne({ where: { email } }).then((user) => {
          if (user) {
            req.flash("error_msg", "email已註冊");
            return res.redirect("/signup");
          } else {
            User.create({
              name,
              email,
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
              role: 0,
            }).then((user) => {
              req.flash("success_msg", "註冊成功");
              return res.redirect("/signin");
            });
          }
        });
      }
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },
  signInPage: (req, res) => {
    return res.render("signin");
  },
  signIn: (req, res) => {
    req.flash("success_msg", "成功登入");
    res.redirect("/movies");
  },
  logout: (req, res) => {
    req.flash("success_msg", "成功登出");
    req.logout();
    res.redirect("/signin");
  },
  getUser: (req, res) => {
    try {
      User.findByPk(req.params.id, {
        include: [
          { model: Comment, include: [Movie] },
          { model: Movie, as: "FavoritedMovies" },
          { model: User, as: "Followers" },
          { model: User, as: "Followings" },
        ],
      }).then((user) => {
        let result = new Set();
        let len = [];
        user.Comments.forEach((item) => {
          if (!result.has(item.MovieId)) {
            result.add(item.MovieId);
            len.push(result);
          }
        });
        const isFollowed = req.user.Followings.map((d) => d.id).includes(
          user.id
        );
        return res.render("profile", {
          user: user.toJSON(),
          len: len.length,
          self: req.user.id,
          isFollowed,
        });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },
  editUser: (req, res) => {
    try {
      User.findByPk(req.params.id, { raw: true }).then((user) => {
        return res.render("editProfile", { user });
      });
    } catch (error) {
      req.flash("error_msg", error.toString());
      return res.status(500).redirect("back");
    }
  },
  putUser: (req, res) => {
    if (!req.body.name) {
      req.flash("error_msg", "name didn't exist!!");
      res.redirect("back");
    }

    const { file } = req;

    if (file) {
      imgur.setClientID(IMGUR_CLIENT);
      imgur.upload(file.path, (err, img) => {
        return User.findByPk(req.params.id).then((user) => {
          user
            .update({
              name: req.body.name,
              image: file ? img.data.link : user.image,
            })
            .then((user) => {
              req.flash("success_msg", "user was successfully to update");
              res.redirect(`/users/${user.id}`);
            });
        });
      });
    } else {
      return User.findByPk(req.params.id).then((user) => {
        user
          .update({
            name: req.body.name,
            image: user.image,
          })
          .then((user) => {
            req.flash("success_msg", "user was successfully to update");
            res.redirect(`/users/${user.id}`);
          });
      });
    }
  },
  addFavorite: (req, res) => {
    return Favorite.create({
      UserId: req.user.id,
      MovieId: req.params.movieId,
    }).then((favorite) => {
      return res.redirect("back");
    });
  },
  removeFavorite: (req, res) => {
    return Favorite.findOne({
      where: {
        UserId: req.user.id,
        MovieId: req.params.movieId,
      },
    }).then((favorite) => {
      favorite.destroy().then((favorite) => {
        return res.redirect("back");
      });
    });
  },
  addLike: (req, res) => {
    return Like.create({
      UserId: req.user.id,
      MovieId: req.params.movieId,
    }).then((like) => {
      res.redirect("back");
    });
  },
  removeLike: (req, res) => {
    return Like.findOne({
      where: {
        UserId: req.user.id,
        MovieId: req.params.movieId,
      },
    }).then((like) => {
      like.destroy().then((like) => {
        return res.redirect("back");
      });
    });
  },
  getTopUser: (req, res) => {
    return User.findAll({
      include: [{ model: User, as: "Followers" }],
    }).then((users) => {
      users = users.map((user) => ({
        ...user.dataValues,
        FollowerCount: user.Followers.length,
        isFollowed: req.user.Followings.map((d) => d.id).includes(user.id),
      }));
      users = users.sort((a, b) => b.FollowerCount - a.FollowerCount);
      return res.render("topUser", { users: users });
    });
  },
  addFollowing: (req, res) => {
    return Followship.create({
      followerId: req.user.id,
      followingId: req.params.userId,
    }).then((following) => {
      return res.redirect("back");
    });
  },
  removeFollowing: (req, res) => {
    return Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId,
      },
    }).then((following) => {
      following.destroy().then((following) => {
        return res.redirect("back");
      });
    });
  },
};

module.exports = userController;
