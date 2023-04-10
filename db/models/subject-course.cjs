'use strict';
const { Model, DataTypes } = require('sequelize');
const { getSequelizeInstance } = require('../index.cjs');

class SubjectCourse extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

SubjectCourse.init(
  {
    subjectId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
  },
  {
    sequelize: getSequelizeInstance(),
    modelName: 'subject_courses',
  },
);

exports.SubjectCourse = SubjectCourse;
