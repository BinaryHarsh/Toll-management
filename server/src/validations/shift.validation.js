const Joi = require('@hapi/joi');

const createShift = {
  body: Joi.object().keys({
    shift_name: Joi.string().required(),
    shift_start_time: Joi.string().required(),
    shift_end_time: Joi.string().required(),
  }),
};

module.exports = {
  createShift,
};
