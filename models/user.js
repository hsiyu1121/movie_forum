"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment);
      User.belongsToMany(models.Movie, {
        through: models.Favorite,
        foreignKey: "UserId",
        as: "FavoritedMovies",
      });
      User.belongsToMany(models.Movie, {
        through: models.Like,
        foreignKey: "UserId",
        as: "LikedMovies",
      });
      User.belongsToMany(User, {
        through: models.Followship,
        foreignKey: "followingId",
        as: "Followers",
      });
      User.belongsToMany(User, {
        through: models.Followship,
        foreignKey: "followerId",
        as: "Followings",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
