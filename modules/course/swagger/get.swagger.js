import j2s from 'joi-to-swagger';
import { courseGetQuerySchema } from '../course-get-query.schema.js';

export const courseSwSchema = j2s(courseGetQuerySchema, {
  in: 'query',
}).swagger;

export const swCourseGet = {
  summary: 'Get courses',
  tags: ['course'],
  parameters: Object.entries(courseSwSchema.properties).map(
    ([name, params]) => ({
      in: 'query',
      name,
      ...params,
    }),
  ),
  responses: {
    200: {
      description: 'Courses received',
    },
    default: {
      description: 'Error message',
    },
  },
};
