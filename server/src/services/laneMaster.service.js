const { db, sequelize } = require('../models');

// Create Lane Service
const createLane = async (bodyData) => {
  const payload = {
    LANE_TYPE: bodyData.LANE_TYPE.toUpperCase(),
    LANE_IP: bodyData.LANE_IP,
    LANE_DIR: bodyData.LANE_DIR.toUpperCase(),
    CREATED_AT: new Date().toISOString(),
    UPDATE_BY: bodyData.UPDATE_BY,
    UPDATED_AT: new Date().toISOString(),
    STATUS: 1,
  };
  if (bodyData.LANE_NAME) {
    const LANE_NAME = bodyData.LANE_NAME.toUpperCase();
    const checkLane = await db.admin_lane_master.findOne({ where: { LANE_NAME: LANE_NAME } });
    if (checkLane) {
      throw new Error('Lane is already exist');
    }
    payload.LANE_NAME = LANE_NAME;
  }

  if (bodyData.LANE_IP) {
    const LANE_IP = bodyData.LANE_IP;
    const checkLane = await db.admin_lane_master.findOne({ where: { LANE_IP: LANE_IP } });
    if (checkLane) {
      throw new Error('IP Address is already given');
    }
  }

  const plazaName = await sequelize.query('select PLAZA_CODE from TBL_PLAZA_MASTER');
  if (plazaName[0][0].PLAZA_CODE) {
    payload.PLAZA_CODE = plazaName[0][0].PLAZA_CODE;
  } else {
    throw new Error('PLEASE CHECK PLAZA CODE IN DB');
  }
  const laneData = await db.admin_lane_master.create(payload);

  return laneData;
};

// Get All Lane  Service
const getAllLane = async () => {
  const getLane = await db.admin_lane_master.findAll({
    include: [
      { model: db.admin_users, attributes: ['first_name', 'last_name'], as: 'updated_User' },
      { model: db.admin_lane_device_config, as: 'ALL_DEVICE' },
    ],
  });
  return getLane;
};

//Lane Update Service
const laneUpdate = async (bodyData, id) => {
  const updateData = {};
  if (bodyData) {
    // if (bodyData.LANE_NAME) {
    //   updateData.LANE_NAME = bodyData.LANE_NAME;
    // }
    if (bodyData.LANE_TYPE) {
      updateData.LANE_TYPE = bodyData.LANE_TYPE;
    }
    if (bodyData.LANE_IP) {
      updateData.LANE_IP = bodyData.LANE_IP;
    }
    if (bodyData.LANE_DIR) {
      updateData.LANE_DIR = bodyData.LANE_DIR;
    }
    if (bodyData.UPDATE_BY) {
      updateData.UPDATE_BY = bodyData.UPDATE_BY;
    }
    updateData.UPDATED_DATE = new Date().toISOString();
  } else {
    throw new Error('please give request body');
  }
  const getStatus = await db.admin_lane_master.findOne({ where: { LANE_ID: id } });
  if (getStatus) {
    const updatedData = await db.admin_lane_master.update(updateData, { where: { LANE_ID: id } });
    return updatedData;
  } else {
    throw new Error('INVALID LANE ID');
  }
};

// Delete Lane Service
const laneDelete = async (id) => {
  const getStatus = await db.admin_lane_master.findOne({ where: { LANE_ID: id } });
  if (getStatus) {
    const deleteLane = await db.admin_lane_master.destroy({ where: { LANE_ID: id } });
    return deleteLane;
  } else {
    throw new Error('Invalid Lane ID ');
  }
};

// Update Status Lane Like:- Active And Deactive
const statusUpdate = async (id) => {
  let valueId = 1;
  const getStatus = await db.admin_lane_master.findOne({ attributes: ['STATUS'], where: { LANE_ID: id } });
  if (getStatus) {
    valueId = !getStatus.STATUS;
  } else {
    throw new Error('Invalid Lane ID ');
  }
  const updateStatus = await db.admin_lane_master.update({ STATUS: valueId }, { where: { LANE_ID: id } });
  return updateStatus;
};

// Get Lane By ID Service
const getLaneByid = async (id) => {
  const getStatus = await db.admin_lane_master.findOne({ attributes: ['STATUS'], where: { LANE_ID: id } });
  if (getStatus) {
    const getData = await db.admin_lane_master.findAll({
      include: [
        { model: db.admin_lane_device_config, as: 'ALL_DEVICE' },
        { model: db.admin_users, attributes: ['first_name', 'last_name'], as: 'updated_User' },
      ],
      where: { LANE_ID: id },
    });
    return getData;
  } else {
    throw new Error('Invalid Lane ID ');
  }
};

module.exports = { createLane, getAllLane, laneUpdate, laneDelete, statusUpdate, getLaneByid };
