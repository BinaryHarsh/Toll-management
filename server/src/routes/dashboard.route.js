const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller')

router.get('/getAllStatistics', dashboardController.getAllStatistics);
router.get('/getTransactionAndVehicleStatistics/:duration', dashboardController.getTransactionAndVehicle);

module.exports=router;