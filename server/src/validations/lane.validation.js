const Joi = require('@hapi/joi');
const { laneType, laneDirection } = require('./custom.validation');

const createLane = {
  body: Joi.object().keys({
    LANE_NAME: Joi.string().required(),
    LANE_TYPE: Joi.string().required().custom(laneType),
    LANE_IP: Joi.string()
      .required()
      .ip({ version: ['ipv4'] }),
    LANE_DIR: Joi.string().required().custom(laneDirection),
    UPDATE_BY: Joi.number().required(),
  }),
};
const updateLane = {
  body: Joi.object().keys({
    LANE_NAME: Joi.string(),
    LANE_TYPE: Joi.string().custom(laneType),
    LANE_IP: Joi.string().ip({ version: ['ipv4'] }),
    LANE_DIR: Joi.string().custom(laneDirection),
    UPDATE_BY: Joi.number(),
  }),
};
module.exports = {
  createLane,
  updateLane,
};
