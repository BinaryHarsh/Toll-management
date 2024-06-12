const { db, sequelize } = require('../models');
const { Op } = require('sequelize');

// get Transactions
const getTransactions = async (filterBody, page) => {
  const limit = 10;
  const offset = (page - 1) * limit;
  const body = filterBody;
  let condition = [];
  if (body.fromDate && body.toDate && !String(body.fromDate).includes('1970') && !String(body.toDate).includes('1970')) {
    condition.push({ PASSAGE_TIME: { [Op.between]: [body.fromDate, body.toDate] } });
  }
  if (!body.fromDate && !body.toDate) {
    const timeZone = 'Asia/Kolkata';
    const option = {
      timeZone: timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const option1 = {
      timeZone: timeZone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const currentDate = new Intl.DateTimeFormat('en-US', option).format(new Date());
    const currentTime = new Intl.DateTimeFormat('en-US', option1).format(new Date());
    const fromDate = currentDate + ' 00:00:00 AM';
    const toDate = currentDate + ' ' + currentTime;
    condition.push({ PASSAGE_TIME: { [Op.between]: [fromDate, toDate] } });
  }
  if (body.tagId && body.tagId !== 'null') condition.push({ TAG: body.tagId });
  if (body.transactionId && body.transactionId !== 'null') condition.push({ LANE_TRANS_ID: body.transactionId });
  if (body.plateNumber && body.plateNumber !== 'null') condition.push({ VEH_PLATE: body.plateNumber });
  if (body.lane && body.lane !== 'null' && body.lane !== 'All') condition.push({ LANE_ID: body.lane });
  if (body.laneType && body.laneType !== 'null' && body.laneType !== 'All') condition.push({ LANE_TYPE: body.laneType });
  if (body.abnormality && body.abnormality !== 'null' && body.abnormality !== 'All')
    condition.push({ ABNORMALITY: body.abnormality });
  if (body.paymentType && body.paymentType !== 'null' && body.paymentType !== 'All')
    condition.push({ RE_PAYMENT_TYPE: body.paymentType });
  if (body.vehicleClass && body.vehicleClass !== 'null' && body.vehicleClass !== 'All')
    condition.push({ VEH_CLASS: body.vehicleClass });
  const transactions = await db.TBL_SLAVE_TRANS.findAll({
    attributes: [
      'PLAZA_CODE',
      'LANE_TRANS_ID',
      'TAG',
      'LANE_TYPE',
      'LANE_ID',
      'DIRECTION',
      [sequelize.literal("FORMAT(PASSAGE_TIME, 'M/d/yyyy, hh:mm:ss tt')"), 'PASSAGE_TIME'],
      'OPERATOR_ID',
      [sequelize.col('PAY.DESCRIPTION'), 'PAY_DESCRIPTION'],
      [sequelize.col('PAYSUB.DESCRIPTION'), 'PAYSUB_DESCRIPTION'],
      'VEH_PLATE',
      'VEH_CLASS',
      'CLASS_FARE',
      'OW_FARE',
      'VALID_ID',
      'REVIEWER_ID',
      'TOTAL_FARE',
      'ABNORMALITY',
      'OPERATOR_COMMENT',
      'AVC.CLASS_DESCRIPTION',
      'REVEH.CLASS_DESCRIPTION',
      [sequelize.col('AVC.CLASS_DESCRIPTION'), 'AVC_CLASS_DESCRIPTION'],
      [sequelize.col('REVEH.CLASS_DESCRIPTION'), 'REVEH_CLASS_DESCRIPTION'],
      [sequelize.col('VEH.CLASS_DESCRIPTION'), 'VEH_CLASS_DESCRIPTION'],
      'RE_VEH_FEE',
      'IS_SAME_DIR',
      'RE_COMMENT',
      'WEIGHT',
    ],
    include: [
      {
        model: db.TBL_MASTER_CLASS,
        as: 'VEH',
        attributes: [],
      },
      {
        model: db.TBL_MASTER_CLASS,
        as: 'REVEH',
        attributes: [],
      },
      {
        model: db.TBL_MASTER_CLASS,
        as: 'AVC',
        attributes: [],
      },
      {
        model: db.PAYMENTTYPE,
        as: 'PAY',
        attributes: [],
        where: { status: 1 },
      },
      {
        model: db.PAYMENTSUBTYPE,
        as: 'PAYSUB',
        attributes: [],
        where: { status: 1 },
      },
    ],
    offset,
    limit,
    where: { [Op.and]: [...condition, { PAYMENT_TYPE: { [Op.ne]: 'TG' } }, { RE_STATUS: 0 }] },
    order: [['PASSAGE_TIME', 'DESC']],
  });
  // Fetch the total count of all transactions
  const count = await db.TBL_SLAVE_TRANS.count({
    where: { [Op.and]: [...condition, { PAYMENT_TYPE: { [Op.ne]: 'TG' } }, { RE_STATUS: 0 }] },
  });
  const totalCount = count;
  return {
    totalCount,
    transactions,
  };
};

// get Transaction by TxnId
const getTransactionByTXnId = async (laneTransId) => {
  const transaction = await db.TBL_SLAVE_TRANS.findOne({
    where: { LANE_TRANS_ID: laneTransId },
    attributes: [
      'PLAZA_CODE',
      'LANE_TRANS_ID',
      'TAG',
      'LANE_TYPE',
      'LANE_ID',
      'DIRECTION',
      [sequelize.literal("FORMAT(PASSAGE_TIME, 'M/d/yyyy, hh:mm:ss tt')"), 'PASSAGE_TIME'],
      'OPERATOR_ID',
      [sequelize.col('PAY.DESCRIPTION'), 'PAY_DESCRIPTION'],
      [sequelize.col('PAYSUB.DESCRIPTION'), 'PAYSUB_DESCRIPTION'],
      'VEH_PLATE',
      'VEH_CLASS',
      'CLASS_FARE',
      'OW_FARE',
      'VALID_ID',
      'REVIEWER_ID',
      'TOTAL_FARE',
      'ABNORMALITY',
      'OPERATOR_COMMENT',
      'AVC.CLASS_DESCRIPTION',
      'REVEH.CLASS_DESCRIPTION',
      [sequelize.col('AVC.CLASS_DESCRIPTION'), 'AVC_CLASS_DESCRIPTION'],
      [sequelize.col('REVEH.CLASS_DESCRIPTION'), 'REVEH_CLASS_DESCRIPTION'],
      [sequelize.col('VEH.CLASS_DESCRIPTION'), 'VEH_CLASS_DESCRIPTION'],
      'RE_VEH_FEE',
      'RE_VEH_CLASS',
      'IS_SAME_DIR',
      'RE_COMMENT',
      'RE_STATUS',
      'WEIGHT',
    ],
    include: [
      {
        model: db.TBL_MASTER_CLASS,
        as: 'VEH',
        attributes: [],
      },
      {
        model: db.TBL_MASTER_CLASS,
        as: 'REVEH',
        attributes: [],
      },
      {
        model: db.TBL_MASTER_CLASS,
        as: 'AVC',
        attributes: [],
      },
      {
        model: db.PAYMENTTYPE,
        as: 'PAY',
        attributes: [],
      },
      {
        model: db.PAYMENTSUBTYPE,
        as: 'PAYSUB',
        attributes: [],
        where: { status: 1 },
      },
    ],
  });

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  return transaction;
};

// Update By TxnId
const updateTransactionByTxnId = async (laneTransId, updatedData) => {
  const transaction = await db.TBL_SLAVE_TRANS.findOne({
    where: { LANE_TRANS_ID: laneTransId },
  });

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  // Perform the update operation
  await db.TBL_SLAVE_TRANS.update(updatedData, {
    where: { LANE_TRANS_ID: laneTransId },
  });

  // Retrieve the updated transaction
  const updatedTransaction = await db.TBL_SLAVE_TRANS.findOne({
    where: { LANE_TRANS_ID: laneTransId },
  });

  return updatedTransaction;
};

// validate service
const validationUpdate = async (bodyData) => {
  const { transId, reviewerFee, reviewerComment, reviewerId, reviewerClass, rePaymentType, rePaymentSubType } = bodyData;
  const transaction = await db.TBL_SLAVE_TRANS.findOne({
    where: { LANE_TRANS_ID: transId },
  });
  var Mode = 'MANUAL'
  if (rePaymentType === 'TG') {
    Mode = 'ETC'
  }
  if (transaction == null) {
    throw new Error('transaction not found')
  }
  if (transaction.RE_PAYMENT_TYPE == 'CS' && rePaymentType != 'CS' || transaction.RE_PAYMENT_SUBTYPE == 'SJ' && rePaymentSubType != 'SJ') {
    throw new Error('Please do not change Cash Transaction Payment Type')
  }
  if (transaction.RE_PAYMENT_TYPE == 'TG' && rePaymentType != 'TG' || transaction.RE_PAYMENT_SUBTYPE == 'TG' && rePaymentSubType != 'TG') {
    throw new Error('Please do not change FAST TAG Transaction Payment Type')
  }
  const update = await db.TBL_SLAVE_TRANS.update(
    {
      RE_COMMENT: reviewerComment,
      RE_VEH_FEE: reviewerFee,
      RE_VEH_CLASS: reviewerClass,
      RE_STATUS: 1,
      REVIEWER_ID: reviewerId,
      RE_PAYMENT_TYPE: rePaymentType,
      RE_PAYMENT_SUBTYPE: rePaymentSubType,
      MODE: Mode
    },
    {
      where: {
        LANE_TRANS_ID: transId,
      },
    }
  );
  return update;
};

// Report Filter Service
const adminFillterReport = async (filterBody, page) => {
  const limit = 10;
  const offset = (page - 1) * limit;
  const body = filterBody;
  let condition = [];
  if (body.fromDate && body.toDate && !String(body.fromDate).includes('1970') && !String(body.toDate).includes('1970')) {
    condition.push({ PASSAGE_TIME: { [Op.between]: [body.fromDate, body.toDate] } });
  }
  if (body.tagId && body.tagId !== 'null') condition.push({ TAG: body.tagId });
  if (body.transactionId && body.transactionId !== 'null') condition.push({ LANE_TRANS_ID: body.transactionId });
  if (body.plateNumber && body.plateNumber !== 'null') condition.push({ VEH_PLATE: body.plateNumber });
  if (body.lane && body.lane !== 'null' && body.lane !== 'All') condition.push({ LANE_ID: body.lane });
  if (body.laneType && body.laneType !== 'null' && body.laneType !== 'All') condition.push({ LANE_TYPE: body.laneType });
  if (body.abnormality && body.abnormality !== 'null' && body.abnormality !== 'All')
    condition.push({ ABNORMALITY: body.abnormality });
  if (body.paymentType && body.paymentType !== 'null' && body.paymentType !== 'All')
    condition.push({ RE_PAYMENT_TYPE: body.paymentType });
  if (body.vehicleClass && body.vehicleClass !== 'null' && body.vehicleClass !== 'All')
    condition.push({ VEH_CLASS: body.vehicleClass });
  if (body.avcClass && body.avcClass !== 'null' && body.avcClass !== 'All') condition.push({ AVC_CLASS: body.avcClass });
  if (body.operater && body.operater !== 'null' && body.operater !== 'All')
    condition.push({ OPERATOR_ID: body.operater.USERNAME });
  if (body.paymentSubType && body.subtype !== 'null' && body.paymentSubType !== 'All')
    condition.push({ RE_PAYMENT_SUBTYPE: body.paymentSubType });

  const data = await db.TBL_SLAVE_TRANS.findAll({
    attributes: [
      'PLAZA_CODE',
      'LANE_TRANS_ID',
      'TAG',
      'LANE_TYPE',
      'LANE_ID',
      'DIRECTION',
      [sequelize.literal("FORMAT(PASSAGE_TIME, 'M/d/yyyy, hh:mm:ss tt')"), 'PASSAGE_TIME'],
      'OPERATOR_ID',
      [sequelize.col('PAY.DESCRIPTION'), 'PAY_DESCRIPTION'],
      [sequelize.col('PAYSUB.DESCRIPTION'), 'PAYSUB_DESCRIPTION'],
      'VEH_PLATE',
      'VEH_CLASS',
      'CLASS_FARE',
      'OW_FARE',
      'VALID_ID',
      'REVIEWER_ID',
      'TOTAL_FARE',
      'ABNORMALITY',
      'OPERATOR_COMMENT',
      'AVC.CLASS_DESCRIPTION',
      'REVEH.CLASS_DESCRIPTION',
      [sequelize.col('AVC.CLASS_DESCRIPTION'), 'AVC_CLASS_DESCRIPTION'],
      [sequelize.col('REVEH.CLASS_DESCRIPTION'), 'REVEH_CLASS_DESCRIPTION'],
      [sequelize.col('VEH.CLASS_DESCRIPTION'), 'VEH_CLASS_DESCRIPTION'],
      'RE_VEH_FEE',
      'IS_SAME_DIR',
      'RE_COMMENT',
      'WEIGHT',
    ],

    include: [
      {
        model: db.TBL_MASTER_CLASS,
        as: 'VEH',
        attributes: [],
      },
      {
        model: db.TBL_MASTER_CLASS,
        as: 'REVEH',
        attributes: [],
      },
      {
        model: db.TBL_MASTER_CLASS,
        as: 'AVC',
        attributes: [],
      },
      {
        model: db.PAYMENTTYPE,
        as: 'PAY',
        attributes: [],
        where: { status: 1 },
      },
      {
        model: db.PAYMENTSUBTYPE,
        as: 'PAYSUB',
        attributes: [],
        where: { status: 1 },
      },
    ],
    offset,
    limit,
    where: { [Op.and]: [...condition] },
    order: [['PASSAGE_TIME', 'DESC']],
  });
  // Fetch the total count of all transactions
  const count = await db.TBL_SLAVE_TRANS.count({
    where: { [Op.and]: [...condition] },
  });
  const totalCount = count;
  return {
    data: data,
    totalCount: totalCount
  };
};

// Get All Payment Type
const getAllPaymentType = async () => {
  const paymentType = await db.PAYMENTTYPE.findAll({ where: { STATUS: 1 } });
  return paymentType;
};

// Get All Payment Sub type
const getAllPaymentSubType = async () => {
  const paymentSubType = await db.PAYMENTSUBTYPE.findAll({ where: { STATUS: 1 } });
  return paymentSubType;
};

// get next transaction details
const getNextTransactionId = async (id) => {
  const data = await sequelize.query(
    `SELECT TOP 1 *
      FROM TBL_SLAVE_TRANS
      WHERE LANE_TRANS_ID < '${id}' AND PAYMENT_TYPE <> 'TG' AND RE_STATUS = 0
      ORDER BY LANE_TRANS_ID DESC`
  );

  return data[0];
};

// get next transaction details
const getPreviousTransactionId = async (id) => {
  const data = await sequelize.query(
    `SELECT TOP 1 *
      FROM TBL_SLAVE_TRANS
      WHERE LANE_TRANS_ID > '${id}' AND PAYMENT_TYPE <> 'TG' AND RE_STATUS = 0
      ORDER BY LANE_TRANS_ID`
  );

  return data[0];
};

const getAllVehicleClass = async () => {
  const data = await db.TBL_MASTER_CLASS.findAll({
    where: { CLASS_STATUS: 1 },
  });
  return data;
};


const cancelTransaction = async (body) => {
  const { loginUser, comment, transactionId } = body;
  if (comment == 'Select') {
    throw new Error('please provide comment');
  }
  if (!loginUser) {
    throw new Error('please provide loginUser');
  }
  if (!transactionId) {
    throw new Error('please provide transactionId');
  }
  await db.TBL_SLAVE_TRANS.update(
    {
      ABNORMALITY: 'NOT OK',
      RE_VEH_FEE: 0,
      TOTAL_FARE: 0,
      CLASS_FARE: 0,
      OW_FARE: 0,
      PAYMENT_SUBTYPE: 'CP',
      PAYMENT_TYPE: 'CP',
      RE_PAYMENT_SUBTYPE: 'CP',
      RE_PAYMENT_TYPE: 'CP',
      RE_STATUS: 0,
      RE_VEH_FEE: 0,
      MODE: 'MANUAL',
      RE_TIME: null,
      CASHIER_ID: loginUser,
      CS_REVIEW_TIME: new Date().toISOString(),
      CS_COMMENT: comment,
    },
    {
      where: {
        LANE_TRANS_ID: transactionId,
      },
    }
  );
  return true;
};

const getTransactionAfterCancel = async (body, page) => {
  const limit = 10;
  const offset = (page - 1) * limit;
  const condition = [];
  if (
    body.fromDate &&
    body.toDate &&
    !String(body.fromDate).includes("1970") &&
    !String(body.toDate).includes("1970")
  ) {
    condition.push({
      PASSAGE_TIME: { [Op.between]: [body.fromDate, body.toDate] },
    });
  }
  if (body.transactionId && body.transactionId !== "null")
    condition.push({ LANE_TRANS_ID: body.transactionId });
  if (body.plateNumber && body.plateNumber !== "null")
    condition.push({ VEH_PLATE: body.plateNumber });
  if (body.lane && body.lane !== "null" && body.lane !== "All")
    condition.push({ LANE_ID: body.lane });

  const data = await db.TBL_SLAVE_TRANS.findAll({
    attributes: [
      "LANE_TRANS_ID",
      "LANE_ID",
      [
        sequelize.literal("FORMAT(PASSAGE_TIME, 'M/d/yyyy, hh:mm:ss tt')"),
        "PASSAGE_TIME",
      ],
      "OPERATOR_ID",
      "VEH_PLATE",
      "VEH_CLASS",
      "CLASS_FARE",
      "ABNORMALITY",
      "OPERATOR_COMMENT",
      [sequelize.col("PAY.DESCRIPTION"), "PAY_DESCRIPTION"],
      [sequelize.col("PAYSUB.DESCRIPTION"), "PAYSUB_DESCRIPTION"],
      [sequelize.col("AVC.CLASS_DESCRIPTION"), "AVC_CLASS_DESCRIPTION"],
      [sequelize.col("VEH.CLASS_DESCRIPTION"), "VEH_CLASS_DESCRIPTION"],
      "RE_COMMENT",
    ],

    include: [
      {
        model: db.TBL_MASTER_CLASS,
        as: "VEH",
        attributes: [],
      },
      {
        model: db.TBL_MASTER_CLASS,
        as: "AVC",
        attributes: [],
      },
      {
        model: db.PAYMENTTYPE,
        as: "PAY",
        attributes: [],
        where: { status: 1 },
      },
      {
        model: db.PAYMENTSUBTYPE,
        as: "PAYSUB",
        attributes: [],
        where: { status: 1 },
      },
    ],
    offset,
    limit,
    where: {
      [Op.and]: [
        ...condition,
        { ABNORMALITY: "NOT OK" },
        { PAYMENT_TYPE: "CP" },
      ],
    },
    order: [["PASSAGE_TIME", "DESC"]],
  });
  // Fetch the total count of all transactions
  const count = await db.TBL_SLAVE_TRANS.count({
    where: {
      [Op.and]: [
        ...condition,
        { ABNORMALITY: "NOT OK" },
        { PAYMENT_TYPE: "CP" },
      ],
    },
  });
  const totalCount = count;
  return {
    totalCount,
    data,
  };
};

const getTransactionForCancel = async (body, page) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  let condition = [];
  if (
    body.fromDate &&
    body.toDate &&
    !String(body.fromDate).includes("1970") &&
    !String(body.toDate).includes("1970")
  ) {
    condition.push({
      PASSAGE_TIME: { [Op.between]: [body.fromDate, body.toDate] },
    });
  }
  if (body.transactionId && body.transactionId !== "null")
    condition.push({ LANE_TRANS_ID: body.transactionId });
  if (body.plateNumber && body.plateNumber !== "null")
    condition.push({ VEH_PLATE: body.plateNumber });
  if (body.lane && body.lane !== "null" && body.lane !== "All")
    condition.push({ LANE_ID: body.lane });
  const data = await db.TBL_SLAVE_TRANS.findAll({
    attributes: [
      "LANE_TRANS_ID",
      "LANE_ID",
      [
        sequelize.literal("FORMAT(PASSAGE_TIME, 'M/d/yyyy, hh:mm:ss tt')"),
        "PASSAGE_TIME",
      ],
      "OPERATOR_ID",
      "VEH_PLATE",
      "VEH_CLASS",
      "CLASS_FARE",
      "ABNORMALITY",
      "OPERATOR_COMMENT",
      [sequelize.col("AVC.CLASS_DESCRIPTION"), "AVC_CLASS_DESCRIPTION"],
      [sequelize.col("VEH.CLASS_DESCRIPTION"), "VEH_CLASS_DESCRIPTION"],
      [sequelize.col("PAY.DESCRIPTION"), "PAY_DESCRIPTION"],
      [sequelize.col("PAYSUB.DESCRIPTION"), "PAYSUB_DESCRIPTION"],
      "MODE",
      "RE_COMMENT",
    ],

    include: [
      {
        model: db.TBL_MASTER_CLASS,
        as: "VEH",
        attributes: [],
      },
      {
        model: db.TBL_MASTER_CLASS,
        as: "AVC",
        attributes: [],
      },
      {
        model: db.PAYMENTTYPE,
        as: "PAY",
        attributes: [],
      },
      {
        model: db.PAYMENTSUBTYPE,
        as: "PAYSUB",
        attributes: [],
        where: { status: 1 },
      },
    ],
    offset,
    limit,
    where: {
      [Op.and]: [...condition, { PAYMENT_TYPE: 'CS' }],
      RE_STATUS: {
        [Op.not]: 1,
      },
    },
    order: [["PASSAGE_TIME", "DESC"]],
  });
  const count = await db.TBL_SLAVE_TRANS.count({
    where: {
      [Op.and]: [...condition, { PAYMENT_TYPE: 'CS' }],
    },
  });
  const totalCount = count;
  return {
    totalCount,
    data,
  };
}

module.exports = {
  getAllVehicleClass,
  getPreviousTransactionId,
  getNextTransactionId,
  getTransactions,
  getTransactionByTXnId,
  updateTransactionByTxnId,
  validationUpdate,
  adminFillterReport,
  getAllPaymentType,
  getAllPaymentSubType,
  cancelTransaction,
  getTransactionForCancel,
  getTransactionAfterCancel
};
