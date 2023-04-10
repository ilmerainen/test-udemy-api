'use strict';
const { Model, DataTypes } = require('sequelize');

const { Image } = require('./image.cjs');
const { getSequelizeInstance } = require('../index.cjs');
const { Subject } = require('./subject.cjs');
const sequelize = getSequelizeInstance();

class Course extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {}
}

Course.init(
  {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    sourceType: DataTypes.STRING,
    level: DataTypes.STRING,
    descriptions: DataTypes.STRING,
    types: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    modelName: 'course',
    sequelize,
  },
);

Course.belongsToMany(Image, {
  through: 'course_images',
});
Course.belongsToMany(Subject, {
  through: 'subject_courses',
});

exports.Course = Course;
