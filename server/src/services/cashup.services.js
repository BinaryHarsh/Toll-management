const { db, sequelize } = require('../models');
const path = require('path');
const fs = require('fs');
var csvWriter = require('csv-write-stream');

const getDenominations = async () => {
  const data = await sequelize.query('select * from DENOMINATIONS where DENOM_STATUS=1')
  return data[0]
}

const createCashUp = async (body) => {
  let cashupID = null
  const payloadForCashUp = {
    shift: body.shift,
    tc_id: body.tcID,
    cashier_id: body.cashierID,
    role_id: body.roleID,
    cashup_amount: body.total,
    status: 1,
    created_at: body.time,
    updated_at: body.time,
  }
  const data = await db.admin_cashup.create(payloadForCashUp);
  cashupID = data.id;
  for (const value of body.denomination) {
    if (value.quantity) {
      await db.admin_cashup_denomination.create({
        cashup_id: cashupID,
        type: 'cash',
        cashup_method: body.cashupMethod,
        denomination_amount: value.DENOM_VALUE,
        quantity: value.quantity,
        total_amount: value.total,
        tc_id: body.tcID,
        cashier_id: body.cashierID,
        status: '1',
        created_at: body.time,
        updated_at: body.time
      });
    }
  }
  if (body.upi) {
    await db.admin_cashup_denomination.create({
      cashup_id: cashupID,
      type: 'upi',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.upi,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }
  if (body.card) {
    await db.admin_cashup_denomination.create({
      cashup_id: cashupID,
      type: 'card',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.card,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }
  if (body.dd) {
    await db.admin_cashup_denomination.create({
      cashup_id: cashupID,
      type: 'dd',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.dd,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }
  if (body.rtgs) {
    await db.admin_cashup_denomination.create({
      cashup_id: cashupID,
      type: 'rtgs',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.rtgs,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }
  if (body.wallet) {
    await db.admin_cashup_denomination.create({
      cashup_id: cashupID,
      type: 'wallet',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.wallet,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }
  if (body.cheque) {
    await db.admin_cashup_denomination.create({
      cashup_id: cashupID,
      type: 'cheque',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.cheque,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }
  return "created successfully"
}

const getMidCashUpID = async (id) => {
  const data = await sequelize.query(`  SELECT  id  from admin_cashup 
  where status=1 and cashup_method='midCashup'`)
  return data[0]
}

const getMidCashUpData = async (id) => {
  const data = await sequelize.query(`SELECT tcu.*, tcd.*
  FROM admin_cashup tcu
   JOIN admin_cashup_denomination tcd ON tcu.id = tcd.cashup_id
  WHERE tcu.id = ${id};`)
  obj = {
    quantity: [],
    time: "",
    collecterName: null,
    shift: null,
    upi: 0,
    card: 0,
    dd: 0,
    rtgs: 0,
    wallet: 0,
    cheque: 0,
    total: 0
  }
  const denomination = await sequelize.query('select * from DENOMINATIONS where DENOM_STATUS=1')

  for (let i = 0; i < data[0].length; i++) {
    if (data[0][i].type == 'cash') {
      let index = denomination[0].findIndex((element) => element.DENOM_VALUE == data[0][i].denomination_amount)
      obj.quantity[index] = data[0][i].quantity
    }
    if (data[0][i].type == 'upi') {
      obj.upi = data[0][i].total_amount
    }
    if (data[0][i].type == 'card') {
      obj.card = data[0][i].total_amount
    }
    if (data[0][i].type == 'dd') {
      obj.dd = data[0][i].total_amount
    }
    if (data[0][i].type == 'rtgs') {
      obj.rtgs = data[0][i].total_amount
    }
    if (data[0][i].type == 'wallet') {
      obj.wallet = data[0][i].total_amount
    }
    if (data[0][i].type == 'cheque') {
      obj.cheque = data[0][i].total_amount
    }
  }

  obj.collecterName = data[0][0].tc_id
  obj.shift = data[0][0].shift
  obj.time = data[0][0].created_at
  obj.total = data[0][0].cashup_amount
  return obj
}

const updateCashUp = async (body, id) => {
  const payloadForCashUp = {
    shift: body.shift,
    cashier_id: body.cashierID,
    role_id: body.roleID,
    cashup_amount: body.total,
    status: 1,
    updated_at: new Date().toISOString(),
  }
  await db.admin_cashup.update(payloadForCashUp, {
    where: { id: id },
  });

  for (let value of body.denomination) {
    if (value.quantity) {
      const checkData = await sequelize.query(`select * from admin_cashup_denomination where cashup_id=${id} and type='cash'`)
      const denotationDataArray = checkData[0].map(data => data.denomination_amount);
      if (denotationDataArray.includes(value.DENOM_VALUE)) {
        await sequelize.query(`UPDATE [admin_cashup_denomination]
      SET
        [type] = 'cash',
        [cashup_method] = '${body.cashupMethod}',
        [denomination_amount] = ${value.DENOM_VALUE},
        [quantity] = ${value.quantity},
        [total_amount] = ${value.total},
        [cashier_id] = ${body.cashierID},
        [status] = '1',
        [updated_at] = GETDATE()
      WHERE
        [cashup_id] = ${id} and [denomination_amount]= ${value.DENOM_VALUE} ; 
      `)
      }
      else {
        await db.admin_cashup_denomination.create({
          cashup_id: id,
          type: 'cash',
          cashup_method: body.cashupMethod,
          denomination_amount: value.DENOM_VALUE,
          quantity: value.quantity,
          total_amount: value.total,
          tc_id: body.tcID,
          cashier_id: body.cashierID,
          status: '1',
          created_at: body.time,
          updated_at: body.time
        });
      }
    }
  }

  const checkData = await sequelize.query(`select * from admin_cashup_denomination where cashup_id=${id}`)
  const DataArray = checkData[0].map(data => data.type);

  if (DataArray.includes('upi')) {
    await sequelize.query(`UPDATE [admin_cashup_denomination]
      SET
        [type] = 'upi',
        [cashup_method] = '${body.cashupMethod}',
        [total_amount] = ${body.upi},
        [cashier_id] = ${body.cashierID},
        [status] = '1',
        [updated_at] = GETDATE()
      WHERE
        [cashup_id] = ${id} and type='upi';
      `)

  }
  else {
    await db.admin_cashup_denomination.create({
      cashup_id: id,
      type: 'upi',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.upi,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }
  if (DataArray.includes('card')) {
    await sequelize.query(`UPDATE [admin_cashup_denomination]
    SET
      [type] = 'card',
      [cashup_method] = '${body.cashupMethod}',
      [total_amount] = ${body.card},
      [cashier_id] = ${body.cashierID},
      [status] = '1',
      [updated_at] = GETDATE()
    WHERE
      [cashup_id] = ${id} and type='card';
    `)
  }
  else {
    await db.admin_cashup_denomination.create({
      cashup_id: id,
      type: 'card',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.card,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }

  if (DataArray.includes('dd')) {
    await sequelize.query(`UPDATE [admin_cashup_denomination]
    SET
      [type] = 'dd',
      [cashup_method] = '${body.cashupMethod}',
      [total_amount] = ${body.dd},
      [cashier_id] = ${body.cashierID},
      [status] = '1',
      [updated_at] = GETDATE()
    WHERE
      [cashup_id] = ${id} and type='dd';
    `)
  }
  else {
    await db.admin_cashup_denomination.create({
      cashup_id: id,
      type: 'dd',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.dd,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }
  if (DataArray.includes('rtgs')) {
    await sequelize.query(`UPDATE [admin_cashup_denomination]
    SET
      [type] = 'rtgs',
      [cashup_method] = '${body.cashupMethod}',
      [total_amount] = ${body.rtgs},
      [cashier_id] = ${body.cashierID},
      [status] = '1',
      [updated_at] = GETDATE()
    WHERE
      [cashup_id] = ${id} and type='rtgs';
    `)
  }
  else {
    await db.admin_cashup_denomination.create({
      cashup_id: id,
      type: 'rtgs',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.rtgs,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }


  if (DataArray.includes('wallet')) {
    await sequelize.query(`UPDATE [admin_cashup_denomination]
      SET
        [type] = 'wallet',
        [cashup_method] = '${body.cashupMethod}',
        [total_amount] = ${body.wallet},
        [cashier_id] = ${body.cashierID},
        [status] = '1',
        [updated_at] = GETDATE()
      WHERE
        [cashup_id] = ${id} and type='wallet';
      `)
  }
  else {
    await db.admin_cashup_denomination.create({
      cashup_id: id,
      type: 'wallet',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.wallet,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }


  if (DataArray.includes('cheque')) {
    await sequelize.query(`UPDATE [admin_cashup_denomination]
      SET
        [type] = 'cheque',
        [cashup_method] = '${body.cashupMethod}',
        [total_amount] = ${body.cheque},
        [cashier_id] = ${body.cashierID},
        [status] = '1',
        [updated_at] = GETDATE()
      WHERE
        [cashup_id] = ${id} and type='cheque';
      `)
  }
  else {
    await db.admin_cashup_denomination.create({
      cashup_id: id,
      type: 'cheque',
      cashup_method: body.cashupMethod,
      denomination_amount: 0,
      quantity: 0,
      total_amount: body.cheque,
      tc_id: body.tcID,
      cashier_id: body.cashierID,
      status: '1',
      created_at: body.time,
      updated_at: body.time
    });
  }

  return "updated  successfully"
}

const getShiftCollection = async (body) => {
  const timeZone = 'Asia/Kolkata';
  const options = {
    timeZone: timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const startDate = new Intl.DateTimeFormat('en-US', options).format(new Date(body.fromDate));
  const endDate = new Intl.DateTimeFormat('en-US', options).format(new Date(body.toDate));
  let condition = '';

  // this for cashup table filter 
  if (body.fromDate && body.toDate && !String(body.fromDate).includes('1970') && !String(body.toDate).includes('1970')) {
    condition += ` admin_cashup.created_at BETWEEN'${startDate.replace(',', ' ')}' AND '${endDate.replace(',', ' ')}' AND `;
  }
  if (body.shift && body.shift !== 'null' && body.shift !== 'All') condition += `shift= '${body.shift}' AND `;
  if (body.collectorID && body.collectorID !== 'null' && body.collectorID !== 'All') condition += `tc_id = '${body.collectorID}' AND `;
  if (body.cashierID && body.cashierID !== 'null' && body.cashierID !== 'All') condition += `cashier_id = '${body.cashierID}' AND `;

  const cashUp = await sequelize.query(`  select 
   admin_cashup.id,
      shift,
	  cashier.username as 'cashierName',
	    tcName.username as 'tcName',
      role_id,
      cashup_amount,
      status,
      admin_cashup.created_at,
      cashup_method
  from admin_cashup 
  inner join admin_logins as cashier on  cashier.user_id = admin_cashup.cashier_id
  inner join admin_logins as tcName on  tcName.user_id = admin_cashup.tc_id
  where ${condition} 1=1`)

  for (let val of cashUp[0]) {
    let day = val.created_at.getDate()
    let month = val.created_at.getMonth() + 1
    let year = val.created_at.getFullYear()
    let startDate = `${year}-${month}-${day} 00:00:00`;
    let endDate = `${year}-${month}-${day} 23:59:59`;
    const systemAmount = await sequelize.query(` SELECT
      OPERATOR_ID,
      SHIFT_CODE,
      SUM(RE_VEH_FEE) AS System_amount
    FROM TBL_SLAVE_TRANS AS TS
    WHERE   PASSAGE_TIME >= '${startDate}' 
    AND PASSAGE_TIME < '${endDate}' 
    AND SHIFT_CODE ='${val.shift}' 
    AND  OPERATOR_ID = '${val.tcName}' 
    GROUP BY SHIFT_CODE,OPERATOR_ID;`)
    let date = val.created_at.toISOString();
    val.created_at = date.replace(/[TZ.]/g, ' ').replace("000", '').trim()
    if (systemAmount[0][0]) {
      val.systemAmount = systemAmount[0][0].System_amount;
      val.difference = val.cashup_amount - systemAmount[0][0].System_amount;
      if (systemAmount[0][0].System_amount == val.cashup_amount) {
        val.remark = 'ok'
      }
      if (systemAmount[0][0].System_amount < val.cashup_amount) {
        val.remark = 'Excess'
      }
      if (systemAmount[0][0].System_amount > val.cashup_amount) {
        val.remark = 'Short'
      }
    }
  }

  return cashUp[0];
}

const getShortExcess = async (body) => {
  const timeZone = 'Asia/Kolkata';
  const options = {
    timeZone: timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const startDate = new Intl.DateTimeFormat('en-US', options).format(new Date(body.fromDate));
  const endDate = new Intl.DateTimeFormat('en-US', options).format(new Date(body.toDate));
  let condition = '';

  // this for cashup table filter 
  if (body.fromDate && body.toDate && !String(body.fromDate).includes('1970') && !String(body.toDate).includes('1970')) {
    condition += ` admin_cashup.created_at BETWEEN'${startDate.replace(',', ' ')}' AND '${endDate.replace(',', ' ')}' AND `;
  }
  if (body.shift && body.shift !== 'null' && body.shift !== 'All') condition += `shift= '${body.shift}' AND `;
  if (body.collectorID && body.collectorID !== 'null' && body.collectorID !== 'All') condition += `tc_id = '${body.collectorID}' AND `;
  if (body.cashierID && body.cashierID !== 'null' && body.cashierID !== 'All') condition += `cashier_id = '${body.cashierID}' AND `;

  const cashUp = await sequelize.query(`  select 
      shift,
	    tcName.username as 'tcName'
      ,cashup_amount,
      admin_cashup.created_at
      ,cashup_method
  from admin_cashup 
  inner join admin_logins as tcName on  tcName.user_id = admin_cashup.tc_id
  where ${condition} 1=1`)

  for (let val of cashUp[0]) {
    let day = val.created_at.getDate()
    let month = val.created_at.getMonth() + 1
    let year = val.created_at.getFullYear()
    let startDate = `${year}-${month}-${day} 00:00:00`;
    let endDate = `${year}-${month}-${day} 23:59:59`;
    const systemAmount = await sequelize.query(` SELECT
      OPERATOR_ID,
      SHIFT_CODE,
      SUM(RE_VEH_FEE) AS System_amount
    FROM TBL_SLAVE_TRANS AS TS
    WHERE   PASSAGE_TIME >= '${startDate}' 
    AND PASSAGE_TIME < '${endDate}' 
    AND SHIFT_CODE ='${val.shift}' 
    AND  OPERATOR_ID = '${val.tcName}' 
    GROUP BY SHIFT_CODE,OPERATOR_ID;`)
    let date = val.created_at.toISOString();
    val.created_at = date.replace(/[TZ.]/g, ' ').replace("000", '').trim()
    val.Excess = 0
    val.short = 0
    if (systemAmount[0][0]) {
      let difference = val.cashup_amount - systemAmount[0][0].System_amount;
      if (systemAmount[0][0].System_amount < val.cashup_amount) {
        val.Excess = difference
      }
      if (systemAmount[0][0].System_amount > val.cashup_amount) {
        val.short = difference
      }
    }
  }

  return cashUp[0];
}



module.exports = {
  getDenominations,
  createCashUp,
  getMidCashUpID,
  getMidCashUpData,
  updateCashUp,
  getShiftCollection,
  getShortExcess
};

