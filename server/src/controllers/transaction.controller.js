const catchAsync = require('../utils/catchAsync');
const transactionService = require('../services/transaction.service');
const path = require('path');
const fs = require('fs');

// get Transactions
const getTransactions = catchAsync(async (req, res) => {
  const { page } = req.query;
  const { transactions, totalCount } = await transactionService.getTransactions(req.body, page);
  const limit = 10;
  const totalPages = Math.floor((totalCount + limit - 1) / limit);
  res.status(200).json({
    data: {
      totalCount,
      totalPages,
      transactions,
    },
  });
});

// get transaction by TxnId
const getTransactionByTXnId = catchAsync(async (req, res, next) => {
  const laneTransId = req.params.id;
  const transaction = await transactionService.getTransactionByTXnId(laneTransId);
  res.status(201).json({
    data: {
      transaction,
    },
  });
});

const updateTransactionByTxnId = catchAsync(async (req, res, next) => {
  const laneTransId = req.params.id;
  const updateData = req.body;
  const updatedtransaction = await transactionService.updateTransactionByTxnId(laneTransId, updateData);
  res.status(201).json({
    data: updatedtransaction,
  });
});

//Update Validation Transaction
const updateValidation = catchAsync(async (req, res, next) => {
  const updateData = req.body;
  const updatedValidation = await transactionService.validationUpdate(updateData);
  return res.status(200).json({
    status: 'success',
    data: updatedValidation,
  });
});

// Filter for Reports
const filteradminReport = catchAsync(async (req, res, next) => {
  const { page } = req.params;
  const filterBody = req.body;
  const filterReport = await transactionService.adminFillterReport(filterBody, page);
  return res.status(200).json({
    data: filterReport.data,
    totalCount: filterReport.totalCount
  });
});

// Get All Payment Type
const getAllPaymentType = catchAsync(async (req, res, next) => {
  const allPaymentType = await transactionService.getAllPaymentType();
  res.status(201).json({
    status: 'success',
    data: {
      allPaymentType,
    },
  });
});

// Get All subPayment Type
const getAllPaymentSubType = catchAsync(async (req, res, next) => {
  const allPaymentSubType = await transactionService.getAllPaymentSubType();
  res.status(201).json({
    status: 'success',
    data: {
      allPaymentSubType,
    },
  });
});

// get Next transaction
const getNextTransactionId = catchAsync(async (req, res, next) => {
  const transactionDetails = await transactionService.getNextTransactionId(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      transactionDetails,
    },
  });
});

// get Next transaction
const getPreviousTransactionId = catchAsync(async (req, res, next) => {
  const transactionDetails = await transactionService.getPreviousTransactionId(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      transactionDetails,
    },
  });
});

// Get All Payment Type
const getAllVehicleClass = catchAsync(async (req, res, next) => {
  const vehicleClass = await transactionService.getAllVehicleClass();
  res.status(201).json({
    status: 'success',
    data: {
      vehicleClass,
    },
  });
});


const cancelTransaction = catchAsync(async (req, res, next) => {
  const cancelStatus = await transactionService.cancelTransaction(req.body);
  res.status(200).json({
    status: 'updated sucessfully',
    data: cancelStatus,
  });
});

const getTransactionAfterCancel = catchAsync(async (req, res, next) => {
  const page = req.params.page;
  const { data, totalCount } = await transactionService.getTransactionAfterCancel(req.body, page);
  const limit = 10;
  const totalPages = Math.floor((totalCount + limit - 1) / limit);
  res.status(200).json({
    data: {
      totalCount,
      totalPages,
      data,
    },
  });
});
const getTransactionForCancel = catchAsync(async (req, res, next) => {
  const page = req.params.page;
  const { data, totalCount } = await transactionService.getTransactionForCancel(req.body, page);
  const limit = 10;
  const totalPages = Math.floor((totalCount + limit - 1) / limit);
  res.status(200).json({
    data: {
      totalCount,
      totalPages,
      data,
    },
  });
});

module.exports = {
  getAllVehicleClass,
  getPreviousTransactionId,
  getTransactions,
  getTransactionByTXnId,
  updateTransactionByTxnId,
  updateValidation,
  filteradminReport,
  getAllPaymentType,
  getAllPaymentSubType,
  getNextTransactionId,
  cancelTransaction,
  getTransactionForCancel,
  getTransactionAfterCancel,
};
