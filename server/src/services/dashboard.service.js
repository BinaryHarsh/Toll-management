const { duration } = require('moment-timezone');
const { db, sequelize } = require('../models');
const { Op } = require('sequelize');
const si = require('systeminformation');

// transaction status service deshboard
const getTransactionStatus = async (duration) => {
  let condition = '';
  const day = new Date();
  const week = new Date();
  const month = new Date();
  const year = new Date();
  week.setDate(week.getDate() - 6);
  month.setDate(month.getDate() - 30);
  year.setDate(year.getDate() - 365);

  const timeZone = "Asia/Kolkata";
  const option = {
    timeZone: timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const option1 = {
    timeZone: timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const current1 = new Intl.DateTimeFormat("en-US", option).format(day);
  const current2 = new Intl.DateTimeFormat("en-US", option).format(week);
  const current3 = new Intl.DateTimeFormat("en-US", option).format(month);
  const current4 = new Intl.DateTimeFormat("en-US", option).format(year);
  const currentTime = new Intl.DateTimeFormat("en-US", option1).format(day);
  const toDate = current1 + " " + currentTime

  if (duration === 'WEEK') {
    const fromDate = current2 + " " + "00:00:00";
    condition += ` TS.PASSAGE_TIME BETWEEN'${fromDate.replace(',', ' ')}' AND '${toDate.replace(',', ' ')}' AND `
  }
  else if (duration === 'MONTH') {
    const fromDate = current3 + " " + "00:00:00";
    condition += ` TS.PASSAGE_TIME BETWEEN'${fromDate.replace(',', ' ')}' AND '${toDate.replace(',', ' ')}' AND `
  }
  else if (duration === 'YEAR') {
    const fromDate = current4 + " " + "00:00:00";
    condition += ` TS.PASSAGE_TIME BETWEEN'${fromDate.replace(',', ' ')}' AND '${toDate.replace(',', ' ')}' AND `
  }
  else {
    const fromDate = current1 + " " + "00:00:00";
    condition += ` TS.PASSAGE_TIME BETWEEN'${fromDate.replace(',', ' ')}' AND '${toDate.replace(',', ' ')}' AND `

  }

  const payment = await sequelize.query(`SELECT
    SUM(CASE WHEN RE_PAYMENT_TYPE = 'CS' THEN 1 ELSE 0 END) AS 'Cash',
    SUM(CASE WHEN RE_PAYMENT_TYPE = 'VI' THEN 1 ELSE 0 END) AS 'Voilation',
    SUM(CASE WHEN RE_PAYMENT_TYPE = 'EX' THEN 1 ELSE 0 END) AS 'Exempt',
    SUM(CASE WHEN RE_PAYMENT_TYPE = 'CV' THEN 1 ELSE 0 END) AS 'Convoy',
    SUM(CASE WHEN RE_PAYMENT_TYPE = 'CP' THEN 1 ELSE 0 END) AS 'CancelPayment',
    SUM(CASE WHEN RE_PAYMENT_TYPE = 'TG' THEN 1 ELSE 0 END) AS 'FASTag',
    COUNT(RE_PAYMENT_TYPE) AS 'totalCount'
FROM TBL_SLAVE_TRANS AS TS
WHERE ${condition} 1=1`)

  return payment[0][0];
};
// vehicle classification for deshboard
const getVehicleClassification = async (duration) => {

  let condition = "";
  const day = new Date();
  const week = new Date();
  const month = new Date();
  const year = new Date();
  week.setDate(week.getDate() - 6);
  month.setDate(month.getDate() - 30);
  year.setDate(year.getDate() - 365);

  const timeZone = "Asia/Kolkata";
  const option = {
    timeZone: timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const option1 = {
    timeZone: timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const current1 = new Intl.DateTimeFormat("en-US", option).format(day);
  const current2 = new Intl.DateTimeFormat("en-US", option).format(week);
  const current3 = new Intl.DateTimeFormat("en-US", option).format(month);
  const current4 = new Intl.DateTimeFormat("en-US", option).format(year);
  const currentTime = new Intl.DateTimeFormat("en-US", option1).format(day);
  const toDate = current1 + " " + currentTime

  if (duration === 'WEEK') {
    const fromDate = current2 + " " + "00:00:00";
    condition += ` TS.PASSAGE_TIME BETWEEN'${fromDate.replace(',', ' ')}' AND '${toDate.replace(',', ' ')}' AND `
  }
  else if (duration === 'MONTH') {
    const fromDate = current3 + " " + "00:00:00";
    condition += ` TS.PASSAGE_TIME BETWEEN'${fromDate.replace(',', ' ')}' AND '${toDate.replace(',', ' ')}' AND `
  }
  else if (duration === 'YEAR') {
    const fromDate = current4 + " " + "00:00:00";
    condition += ` TS.PASSAGE_TIME BETWEEN'${fromDate.replace(',', ' ')}' AND '${toDate.replace(',', ' ')}' AND `
    console.log(fromDate, toDate);
  }
  else {
    const fromDate = current1 + " " + "00:00:00";
    condition += ` TS.PASSAGE_TIME BETWEEN'${fromDate.replace(',', ' ')}' AND '${toDate.replace(',', ' ')}' AND `
  }
  const countObject = {};

  const vehicleClass = await sequelize.query(`SELECT
    SUM(CASE WHEN RE_VEH_CLASS = 1 THEN 1 ELSE 0 END) AS '1-CAR\\JEEP\\VAN',
    SUM(CASE WHEN RE_VEH_CLASS = 2 THEN 1 ELSE 0 END) AS '2-LCV\\MINIBUS',
    SUM(CASE WHEN RE_VEH_CLASS = 3 THEN 1 ELSE 0 END) AS '3-BUS2AXLES',
    SUM(CASE WHEN RE_VEH_CLASS = 4 THEN 1 ELSE 0 END) AS '4-TRUCK2AXLES',
    SUM(CASE WHEN RE_VEH_CLASS = 5 THEN 1 ELSE 0 END) AS '5-MAV3AXLES',
    SUM(CASE WHEN RE_VEH_CLASS = 6 THEN 1 ELSE 0 END) AS '6-MAV4to6AXLES',
    SUM(CASE WHEN RE_VEH_CLASS = 7 THEN 1 ELSE 0 END) AS '7-Oversized vehicle'
  FROM TBL_SLAVE_TRANS AS TS
WHERE  ${condition}  1=1`)


  return vehicleClass[0][0];
};

// Lane information For deshboard

const getLaneInformation = async () => {
  const countLaneObject = {};
  const lhs = await sequelize.query(`SELECT
  SUM(CASE WHEN LANE_DIR = 'LHS' AND LANE_STATUS=0 THEN 1 ELSE 0 END) AS 'closed',
 SUM(CASE WHEN LANE_DIR = 'LHS' AND LANE_STATUS=1 THEN 1 ELSE 0 END) AS 'open',
  SUM(CASE WHEN LANE_DIR = 'LHS'  THEN 1 ELSE 0 END) AS 'count'
FROM TBL_LANE_MASTER `)
  countLaneObject.lhs = lhs[0][0]

  const rhs = await sequelize.query(`SELECT
  SUM(CASE WHEN LANE_DIR = 'RHS' AND LANE_STATUS=0 THEN 1 ELSE 0 END) AS 'closed',
 SUM(CASE WHEN LANE_DIR = 'RHS' AND LANE_STATUS=1 THEN 1 ELSE 0 END) AS 'open',
  SUM(CASE WHEN LANE_DIR = 'RHS'  THEN 1 ELSE 0 END) AS 'count'
FROM TBL_LANE_MASTER `)
  countLaneObject.rhs = rhs[0][0]
  return countLaneObject;
};
const getLastFiveTransaction = async () => {
  const lastTransaction = await sequelize.query('select top(5) * from TBL_SLAVE_TRANS ORDER BY PASSAGE_TIME DESC');
  return lastTransaction[0];
};
const getCount = async () => {

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);
  const resultsByDay = [];
  let date1 = [];

  for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {

    const timeZone = "Asia/Kolkata";
    const option = {
      timeZone: timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const current = new Intl.DateTimeFormat("en-US", option).format(
      currentDate
    );
    let fromDate = current + " " + "00:00:00";
    let toDate = current + " " + "23:59:59";
    date1.push(current)
    resultsByDay.push({ fromDate, toDate })
  }
  const countObject = [];

  for (let val of resultsByDay) {

    const data = await sequelize.query(`SELECT
      SUM(VEH_CLASS) AS 'Total'
      FROM TBL_SLAVE_TRANS where PASSAGE_TIME between '${val.fromDate}' and '${val.toDate}' `)

    countObject.push(data[0][0].Total);
  }
  return { countData: countObject, date: date1 }

}


const getRevenue = async () => {

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);
  const resultsByDay = [];
  let date1 = [];

  for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {

    const timeZone = "Asia/Kolkata";
    const option = {
      timeZone: timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const current = new Intl.DateTimeFormat("en-US", option).format(
      currentDate
    );
    let fromDate = current + " " + "00:00:00";
    let toDate = current + " " + "23:59:59";
    date1.push(current)
    resultsByDay.push({ fromDate, toDate })
  }
  const countObject = [];

  for (let val of resultsByDay) {

    const data = await sequelize.query(`SELECT
      SUM(RE_VEH_FEE) AS 'Total'
      FROM TBL_SLAVE_TRANS where PASSAGE_TIME between '${val.fromDate}' and '${val.toDate}' `)

    countObject.push(data[0][0].Total);
  }
  return { cashdata: countObject, date: date1 }

}



module.exports = {
  getTransactionStatus,
  getRevenue,
  getCount,
  getLastFiveTransaction,
  getLaneInformation,
  getVehicleClassification
}