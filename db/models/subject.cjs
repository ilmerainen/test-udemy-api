'use strict';
const { Model, DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../index.cjs');
const { Course } = require('./course.cjs');

class Subject extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsToMany(Course, {
      through: 'subject_courses',
    });
  }
}

Subject.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize: getSequelizeInstance(),
    modelName: 'subject',
  },
);

exports.Subject = Subject;
