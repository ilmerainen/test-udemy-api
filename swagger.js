import { swCourseRouter } from './modules/course/swagger/index.js';
import { swAuthRouter } from './modules/auth/swagger/index.js';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Courses API',
    version: '1.0.0',
    description: 'REST API',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Development server' },
  ],
  paths: {
    ...swCourseRouter,
    ...swAuthRouter,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
