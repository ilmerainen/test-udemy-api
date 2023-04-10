import j2s from 'joi-to-swagger';
import { coursePostJoiSchema } from '../course-post.schema.js';

export const courseSwSchema = j2s(coursePostJoiSchema).swagger;

export const swCoursePost = {
  summary: 'Create a new course',
  tags: ['course'],
  requestBody: {
    content: {
      'application/json': {
        schema: courseSwSchema,
      },
    },
  },
  responses: {
    200: {
      description: 'Course created',
    },
    default: {
      description: 'Error message',
    },
  },
};
