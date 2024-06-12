const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const validate = require('../middlewares/validate');
const vehicleValidation = require('../validations/vehicle.validation');

router.get('/getAllVehicle', vehicleController.getVehicle);
router.post('/createVehicle', validate(vehicleValidation.classSchema), vehicleController.createVehicle);
router.post('/updateVehicle/:classNumber', validate(vehicleValidation.updateClassSchema), vehicleController.updateVehicle);
router.delete('/deleteVehicle/:classNumber', vehicleController.deleteVehicle);
module.exports = router;
