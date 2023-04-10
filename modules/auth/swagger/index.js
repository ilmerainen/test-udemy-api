import { swLogin } from './login.swagger.js';

export const swAuthRouter = {
  '/login': {
    post: swLogin,
  },
  '/signup': {
    post: swLogin,
  },
};
