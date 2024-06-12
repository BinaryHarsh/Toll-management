const { where } = require('sequelize');
const { db, sequelize } = require('../models');

const createVehicle = async (body) => {
  const vehicle = {
    CLASS_DESCRIPTION: body.description.toUpperCase(),
    SEL_KEY: body.selectionKey,
    CLASS_STATUS: true,
    ALLOWED_SPEED: body.allowedSpeed,
    ANPR_CLASS: body.anprClass.toUpperCase(),
    IMAGE: body.imageUrl,
    TAG_CLASS: body.tagClass,
    ENCODED_DATE: new Date().toISOString(),
  };
  const checkClass = await db.TBL_MASTER_CLASS.findOne({ where: { CLASS_DESCRIPTION: body.description } });
  if (checkClass) {
    throw new Error('class description allready given');
  }
  const vehicleCreate = await db.TBL_MASTER_CLASS.create(vehicle);

  return vehicleCreate;
};

const updateVehicle = async (body, classNumber) => {
  if (!body) {
    throw new Error('please provide updated object key & value');
  }

  const vehicle = {};
  if (body.description) {
    vehicle.CLASS_DESCRIPTION = body.description.toUpperCase();
  }
  if (body.selectionKey) {
    vehicle.SEL_KEY = body.selectionKey;
  }
  if (body.allowedSpeed) {
    vehicle.ALLOWED_SPEED = body.allowedSpeed;
  }
  if (body.anprClass) {
    vehicle.ANPR_CLASS = body.anprClass.toUpperCase();
  }
  if (body.imageUrl) {
    vehicle.IMAGE = body.imageUrl;
  }
  if (body.tagClass) {
    vehicle.TAG_CLASS = body.tagClass;
  }
  if (body.classStatus === false || body.classStatus === true) {
    vehicle.CLASS_STATUS = body.classStatus;
  }
  const checkClass = await db.TBL_MASTER_CLASS.findOne({ where: { CLASS_NO: classNumber } });
  if (checkClass) {
    await db.TBL_MASTER_CLASS.update(vehicle, { where: { CLASS_NO: classNumber } });
  } else {
    throw new Error('given class number no match in db ');
  }
  return true;
};
const deleteVehicle = async (classNumber) => {
  const checkClass = await db.TBL_MASTER_CLASS.findOne({ where: { CLASS_NO: classNumber } });
  if (checkClass) {
    await db.TBL_MASTER_CLASS.destroy({ where: { CLASS_NO: classNumber } });
  } else {
    throw new Error('given class number no match in db ');
  }
  return true;
};

const getAllVechicle = async () => {
  const data = await db.TBL_MASTER_CLASS.findAll({});
  return data;
};
module.exports = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVechicle,
};
