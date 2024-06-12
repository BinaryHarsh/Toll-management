const express = require('express');
const roleRoute = require('./role.route');
const userRoute = require('./user.route');
const shiftRoute = require('./shift.route');
const authRoute = require('./auth.route');
const transactionRoute = require('./transaction.route');
const fareRoute = require('./fare.route');
const laneMaster = require('./laneMaster.route');
const laneDevice = require('./laneDevice.route');
const common = require('./common.route');
const report = require('./report.route');
const vehicle = require('./vehicle.route');
const dashboard = require('./dashboard.route');
const cashup   = require('./cashup.route')

const router = express.Router();

router.use('/roles', roleRoute);
router.use('/users', userRoute);
router.use('/shifts', shiftRoute);
router.use('/transaction', transactionRoute);
router.use('/auth', authRoute);
router.use('/fare', fareRoute);
router.use('/lane', laneMaster);
router.use('/laneDevice', laneDevice);
router.use('/common', common);
router.use('/report', report);
router.use('/vehicle', vehicle);
router.use('/dashboard',dashboard)
router.use('/cashup',cashup)
module.exports = router;
