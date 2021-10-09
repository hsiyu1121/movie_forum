"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Category);
      Movie.hasMany(models.Comment);
      Movie.hasMany(models.Reply);
      Movie.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: "MovieId",
        as: "FavoritedUsers",
      });
      Movie.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: "MovieId",
        as: "LikedUsers",
      });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      release_date: DataTypes.DATE,
      image: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER,
      viewCounts: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
