import Joi from 'joi';
import { PaginationSchema } from '../tools/schemas/pagination.schema.js';

export const courseGetQuerySchema = Joi.object({
  search: Joi.string().optional(),
  subjectId: Joi.number().optional(),
  order: Joi.string().allow('ASC', 'DESC').default('ASC'),
}).concat(PaginationSchema);
