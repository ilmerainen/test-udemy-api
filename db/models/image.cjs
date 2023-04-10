'use strict';
const {
  Model
} = require('sequelize');
const { getSequelizeInstance } = require('../index.cjs')
const sequelize = require('sequelize')
const factory = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image.init({
    type: DataTypes.STRING,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};

exports.Image = factory(getSequelizeInstance(), sequelize.DataTypes);
