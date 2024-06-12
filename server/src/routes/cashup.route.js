const express = require('express');
const router = express.Router();
const cashupController = require('../controllers/cashup.controller')

router.get('/getDenominations', cashupController.getDenominations)

router.post('/createCashUp', cashupController.createCashUp)

router.get('/getMidCashUpID', cashupController.getMidCashUpID)

router.get('/getMidCashUpData/:id', cashupController.getMidCashUpData)

router.post('/updateCashUp/:id', cashupController.updateCashUp)

router.post('/getCashUpData', cashupController.getCashUpData)

module.exports = router;