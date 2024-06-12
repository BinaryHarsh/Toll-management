const Joi = require('@hapi/joi');

const createDevice = {
  body: Joi.object().keys({
    LANE_ID: Joi.number().required(),
    DEVICE_NAME: Joi.string().required(),
    DEVICE_URL: Joi.string().required(),
    DESCRIPTION: Joi.string().required(),
    DEVICE_IP: Joi.string()
      .required()
      .ip({ version: ['ipv4'] }),
    PORT: Joi.string().required(),
    TYPE: Joi.string().required(),
  }),
};
const updateDevice = {
  body: Joi.object().keys({
    LANE_ID: Joi.number(),
    DEVICE_NAME: Joi.string(),
    DEVICE_URL: Joi.string(),
    DESCRIPTION: Joi.string(),
    DEVICE_IP: Joi.string().ip({ version: ['ipv4'] }),
    PORT: Joi.string(),
    TYPE: Joi.string(),
  }),
};

module.exports = {
  createDevice,
  updateDevice,
};
