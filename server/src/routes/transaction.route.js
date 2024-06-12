const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const validate = require('../middlewares/validate');
const transactionValidation = require('../validations/transaction.validation');

router.post('/getTransactions', validate(transactionValidation.filterObject), transactionController.getTransactions);
router.get('/getTransactionByTxnId/:id', transactionController.getTransactionByTXnId);
router.patch('/updateTransactionByTxnId/:id', transactionController.updateTransactionByTxnId);
router.put('/updateValidation', transactionController.updateValidation);
router.post('/adminFilterReport/:page', validate(transactionValidation.filterObject), transactionController.filteradminReport);
router.get('/getAllPaymentType', transactionController.getAllPaymentType);
router.get('/getAllPaymentSubType', transactionController.getAllPaymentSubType);
router.get('/getNextTransaction/:id', transactionController.getNextTransactionId);
router.get('/getPreviousTransaction/:id', transactionController.getPreviousTransactionId);
router.get('/getVehicleClass', transactionController.getAllVehicleClass);
router.put('/cancelTransaction', transactionController.cancelTransaction);
router.post('/getTransactionForCancel/:page', transactionController.getTransactionForCancel);
router.post('/getCancelledTransaction/:page', transactionController.getTransactionAfterCancel);


module.exports = router;
