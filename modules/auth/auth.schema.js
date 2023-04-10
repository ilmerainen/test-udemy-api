import Joi from 'joi';

export const AuthSchema = Joi.object({
  username: Joi.string().min(7).required().default('test'),
  password: Joi.string().min(7).required(),
});
