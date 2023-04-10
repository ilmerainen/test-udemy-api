import Joi from 'joi';

export const coursePostJoiSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().required(),
  sourceType: Joi.string().required(),
  level: Joi.string().required(),
  descriptions: Joi.string().required(),
  types: Joi.array().items(Joi.string()),
  subjects: Joi.array().items(Joi.number()),
  images: Joi.array().items(Joi.string()),
});
