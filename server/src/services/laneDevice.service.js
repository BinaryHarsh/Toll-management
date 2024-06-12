const { db } = require('../models');

// create Device Service
const createDevice = async (bodyData) => {
  const payload = {
    DEVICE_IP: bodyData.DEVICE_IP,
    DEVICE_URL: bodyData.DEVICE_URL,
    DESCRIPTION: bodyData.DESCRIPTION,
    PORT: bodyData.PORT,
    TYPE: bodyData.TYPE,
    CREATED_AT: new Date().toISOString(),
    UPDATED_AT: new Date().toISOString(),
    STATUS: 1,
  };
  if (bodyData.DEVICE_NAME) {
    const DEVICE_NAME = bodyData.DEVICE_NAME.toUpperCase();
    const checkLane = await db.admin_lane_device_config.findOne({ where: { DEVICE_NAME: DEVICE_NAME } });
    if (checkLane) {
      throw new Error('Device Name allReady Given');
    }
    payload.DEVICE_NAME = DEVICE_NAME;
  }
  if (bodyData.DEVICE_IP) {
    const DEVICE_IP = bodyData.DEVICE_IP;
    const checkLane = await db.admin_lane_device_config.findOne({ where: { DEVICE_IP: DEVICE_IP } });
    if (checkLane) {
      throw new Error('Device IP allReady Given');
    }
  }
  if (bodyData.PORT) {
    const PORT = bodyData.PORT;
    const checkLane = await db.admin_lane_device_config.findOne({ where: { PORT: PORT } });
    if (checkLane) {
      throw new Error('Port allReady Given');
    }
  }
  const getStatus = await db.admin_lane_master.findOne({ where: { LANE_ID: bodyData.LANE_ID } });
  if (getStatus) {
    payload.LANE_ID = bodyData.LANE_ID;
  } else {
    throw new Error('Invalid Lane ID ');
  }
  const deviceData = await db.admin_lane_device_config.create(payload);

  return deviceData;
};

// Get All Device Service
const getAllDevice = async () => {
  const getDevice = await db.admin_lane_device_config.findAll({});
  return getDevice;
};

// Update Device Service
const deviceUpdate = async (bodyData, id) => {
  const updateData = {};

  if (bodyData) {
    if (bodyData.LANE_ID) {
      const checkLaneId = await db.admin_lane_master.findOne({ where: { LANE_ID: bodyData.LANE_ID } });
      if (checkLaneId) {
        updateData.LANE_ID = bodyData.LANE_ID;
      } else {
        throw new Error('Invalid Lane ID ');
      }
    }
    if (bodyData.DEVICE_NAME) {
      updateData.DEVICE_NAME = bodyData.DEVICE_NAME;
    }
    if (bodyData.DEVICE_IP) {
      updateData.DEVICE_IP = bodyData.DEVICE_IP;
    }
    if (bodyData.DEVICE_URL) {
      updateData.DEVICE_URL = bodyData.DEVICE_URL;
    }
    if (bodyData.DESCRIPTION) {
      updateData.DESCRIPTION = bodyData.DESCRIPTION;
    }
    if (bodyData.PORT) {
      updateData.PORT = bodyData.PORT;
    }
    if (bodyData.TYPE) {
      updateData.TYPE = bodyData.TYPE;
    }
    updateData.UPDATED_AT = new Date().toISOString();
  } else {
    throw new Error('Please give require body ');
  }
  const checkDevice = await db.admin_lane_device_config.findOne({ where: { ID: id } });
  if (checkDevice) {
    const updatedData = await db.admin_lane_device_config.update(updateData, { where: { ID: id } });
    return updatedData;
  } else {
    throw new Error('Invalid Device ID ');
  }
};

// Delete Device Service
const deviceDelete = async (id) => {
  const getStatus = await db.admin_lane_device_config.findOne({ where: { ID: id } });
  if (getStatus) {
    const deleteDevice = await db.admin_lane_device_config.destroy({ where: { ID: id } });
    return deleteDevice;
  } else {
    throw new Error('Invalid Lane ID ');
  }
};

// Status Update Service
const statusUpdate = async (id) => {
  let valueId = 1;
  const getStatus = await db.admin_lane_device_config.findOne({ attributes: ['STATUS'], where: { ID: id } });
  if (getStatus) {
    valueId = !getStatus.STATUS;
  } else {
    throw new Error('Invalid device ID ');
  }
  const updateStatus = await db.admin_lane_device_config.update({ STATUS: valueId }, { where: { ID: id } });
  return updateStatus;
};

module.exports = { createDevice, getAllDevice, deviceUpdate, deviceDelete, statusUpdate };
