import j2s from 'joi-to-swagger';
import { AuthSchema } from '../auth.schema.js';

export const courseSwSchema = j2s(AuthSchema).swagger;

export const swLogin = {
  summary: 'Auth',
  tags: ['Auth'],
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
