"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.Movie);
      Reply.belongsTo(models.User);
    }
  }
  Reply.init(
    {
      reply: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
      CommentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reply",
    }
  );
  return Reply;
};
