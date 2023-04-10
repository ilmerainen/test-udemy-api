import { Course } from '../../db/models/course.cjs';
import { Image } from '../../db/models/image.cjs';
import { SubjectCourse } from '../../db/models/subject-course.cjs';
import { Subject } from '../../db/models/subject.cjs';
import { Op } from 'sequelize';
import { calculateOffset } from '../tools/pagination/index.js';

const DEFAULT_GET_COURSE_COUNT = 10;

export class CourseService {
  constructor() {
    this.courseModel = Course;
    this.subjectCourseModel = SubjectCourse;
    this.subjectModel = Subject;
  }

  async create(course) {
    const subjects = await this.subjectModel.findAll({
      where: {
        id: {
          [Op.in]: course.subjects,
        },
      },
    });

    if (subjects.length !== course.subjects.length) {
      throw new Error('Some subjects are not exist');
    }

    const created = await this.courseModel.create(course, {
      include: [Image],
    });
    await this.subjectCourseModel.bulkCreate(
      course.subjects.map((subjectId) => ({
        subjectId: subjectId,
        courseId: created.id,
      })),
    );
    const result = await this.courseModel.findOne({
      where: {
        id: created.id,
      },
      include: [Image, Subject],
    });

    return result;
  }

  async find(params) {
    const where = {};

    if (params.search) {
      where.title = {
        [Op.iLike]: `%${params.search}%`,
      };
    }

    const include = [];

    if (params.subjectId) {
      include.push({
        model: Subject,
        where: {
          id: params.subjectId,
        },
      });
    }

    let { limit = 10, page = 1 } = params;
    const found = await this.courseModel.findAndCountAll({
      where,
      include,
      limit: params.limit || DEFAULT_GET_COURSE_COUNT,
      offset: calculateOffset(page, limit),
      order: [['id', params.order || 'ASC']],
    });

    return {
      items: found.rows.map((item) => item.get({ plain: true })),
      pages: found.count,
    };
  }
}
