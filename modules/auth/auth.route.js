import { Router } from 'express';
import jwt from 'jsonwebtoken';
import * as strategies from './strategies.js';
import passport from 'passport';

import { validator } from '../tools/middlewares/validator.js';
import { AuthSchema } from './auth.schema.js';

const router = Router();

router.post('/signup', validator.body(AuthSchema), async (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(422);
      return res.json();
    }

    res.json({
      message: 'Signup successful',
    });
  })(req, res, next);
});

router.post('/login', validator.body(AuthSchema), async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(401);
        return res.json();
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: user.id, email: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export { router };
