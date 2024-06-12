const express = require('express');
const router = express.Router();
const laneDeviceController = require('../controllers/laneDevice.controller');
const validate = require('../middlewares/validate');
const DeviceValidation = require('../validations/device.validation');

// Create Device
router.post('/createDevice', validate(DeviceValidation.createDevice), laneDeviceController.createDevice);
//Get All Device
router.get('/getAllDevice', laneDeviceController.getAllDevice);
//Upadete device
router.put('/updateDevice', validate(DeviceValidation.updateDevice), laneDeviceController.updateDevice);
// Delete Device
router.delete('/deleteDevice', laneDeviceController.deleteDevice);
//Change Device Status
router.put('/updateStatus', laneDeviceController.updateStatus);

module.exports = router;
