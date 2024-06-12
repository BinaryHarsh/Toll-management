const Joi = require('@hapi/joi');

const classSchema = {
  body: Joi.object()
    .keys({
      description: Joi.string().max(50).allow(null),
      selectionKey: Joi.string().max(5).required(),
      allowedSpeed: Joi.number().integer().max(9999).allow(null),
      anprClass: Joi.string().max(45).allow(null),
      imageUrl: Joi.string().max(100).allow(null),
      tagClass: Joi.string().max(200).allow(null),
    })
    .required(),
};

const updateClassSchema = {
  body: Joi.object()
    .keys({
      description: Joi.string().max(50).allow(null),
      selectionKey: Joi.string().max(5),
      allowedSpeed: Joi.number().integer().max(9999).allow(null),
      anprClass: Joi.string().max(45).allow(null),
      imageUrl: Joi.string().max(100).allow(null),
      tagClass: Joi.string().max(200).allow(null),
      classStatus: Joi.boolean(),
    })
    .required(),
};
module.exports = {
  classSchema,
  updateClassSchema,
};
