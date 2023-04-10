import express from 'express';
import passport from 'passport';

import { validator } from '../tools/middlewares/validator.js';
import { coursePostJoiSchema } from './course-post.schema.js';
import { CourseService } from './course.service.js';
import { courseGetQuerySchema } from './course-get-query.schema.js';

export const courseRouter = express.Router();
const courseService = new CourseService();

courseRouter.post(
  '/',
  validator.body(coursePostJoiSchema),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const body = req.body;
    try {
      const course = await courseService.create({
        ...body,
        images: body.images.map((path) => ({
          type: 'url',
          path,
        })),
      });

      res.send(
        course.get({
          plain: true,
        }),
      );
    } catch {
      res.status(422).send({
        message: 'Unprocessable entity',
      });
    }
  },
);

courseRouter.get(
  '/',
  validator.query(courseGetQuerySchema),
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const courses = await courseService.find(req.query);

    res.send(courses);
  },
);
