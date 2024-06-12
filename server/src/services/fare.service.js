const { db, sequelize } = require('../models');
const { Op } = require('sequelize');

const getVehicleClassFare = async (queryData) => {
  const allData = await db.TBL_FARE_MASTER.findOne({
    attributes: ['TOLL_FARE'],
    where: { [Op.and]: [{ VEH_CLASS: queryData }, { STATUS: 1 }] },
  });

  return allData;
};

const createFare = async (body) => {
  // const check = await TBL_FARE_MASTER.findOne({where:{ [Op.and]: [{VEH_CLASS: body.vehicleClass},{ACTIVE_DATE: body.activeDate}] }})
  // if(check){
  //   throw new Error('Fare Allready Created')
  // }
  const fare = {
    PLAZA_ENTRY: body.plazaEntry,
    PLAZA_EXIT: body.plazaExit,
    VEH_CLASS: body.vehicleClass,
    TOLL_FARE: body.tollFare,
    OW_FARE: body.overWightFare,
    PAY_TYPE: 'CS',
    PAY_SUB_TYPE: 'SJ',
    ACTIVE_DATE: body.activeDate,
    INACTIVE_DATE: null,
    ENCODED_DATE: new Date().toISOString(),
    STATUS: 0,
    IS_ACTIVE: 0,
  };
  const data = await db.TBL_FARE_MASTER.create(fare);
  return data;
};

const updateFare = async (body, fareId) => {
  const checkFareId = await db.TBL_FARE_MASTER.findOne({ where: { FARE_ID: fareId } });
    console.log(body)
  const fare = {};
  if (body.plazaEntry) {
    fare.PLAZA_ENTRY = body.plazaEntry;
  }
  if (body.plazaExit) {
    fare.PLAZA_EXIT = body.plazaExit;
  }
  if (body.vehicleClass) {
    fare.VEH_CLASS = body.vehicleClass;
  }
  if (body.tollFare) {
    fare.TOLL_FARE = body.tollFare;
  }
  if (body.overWightFare) {
    fare.OW_FARE = body.overWightFare;
  }
  if (body.activeDate) {
    fare.ACTIVE_DATE = body.activeDate;
  }
  if (body.STATUS) {
    fare.STATUS = body.STATUS;
  }
  if (checkFareId) {
    await db.TBL_FARE_MASTER.update(fare, { where: { FARE_ID: fareId } });
  }
  return true;
};

const deleteFare = async (fareId) => {
  const data = await db.TBL_FARE_MASTER.destroy({ where: { FARE_ID: fareId } });
  return data;
};

const getAllFare = async () => {
  const data = await sequelize.query(`SELECT
  FARE_ID,
  PLAZA_ENTRY,
  PLAZA_EXIT,
  VEH_CLASS,
  TOLL_FARE,
  OW_FARE,
  PAY_TYPE,
  PAY_SUB_TYPE,
  TBL_MASTER_CLASS.CLASS_DESCRIPTION,
  CONVERT(NVARCHAR, TBL_FARE_MASTER.ACTIVE_DATE, 101) + ', ' + CONVERT(NVARCHAR, TBL_FARE_MASTER.ACTIVE_DATE, 108) AS ACTIVE_DATE,
  CONVERT(NVARCHAR, TBL_FARE_MASTER.INACTIVE_DATE, 101) + ', ' + CONVERT(NVARCHAR, TBL_FARE_MASTER.INACTIVE_DATE, 108) AS INACTIVE_DATE,
  CONVERT(NVARCHAR, TBL_FARE_MASTER.ENCODED_DATE, 101) + ', ' + CONVERT(NVARCHAR, TBL_FARE_MASTER.ENCODED_DATE, 108) AS ENCODED_DATE,
  TBL_FARE_MASTER.STATUS,
  TBL_FARE_MASTER.IS_ACTIVE
FROM TBL_FARE_MASTER
INNER JOIN TBL_MASTER_CLASS ON TBL_FARE_MASTER.VEH_CLASS = TBL_MASTER_CLASS.CLASS_NO
ORDER BY TBL_FARE_MASTER.ACTIVE_DATE DESC
  `)
  return data[0];
};

module.exports = {
  getVehicleClassFare,
  createFare,
  updateFare,
  deleteFare,
  getAllFare,
};
