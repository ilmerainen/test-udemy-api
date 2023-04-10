import { swCoursePost } from './post.swagger.js';
import { swCourseGet } from './get.swagger.js';

export const swCourseRouter = {
  '/courses': {
    post: {
      ...swCoursePost,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    get: {
      ...swCourseGet,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
};
