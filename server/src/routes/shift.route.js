const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shift.controller');
const validate = require('../middlewares/validate');
const { shiftValidation } = require('../validations');

// Create shift
router.post('/createShift', validate(shiftValidation.createShift), shiftController.createShift);
// get shifts
router.get('/getshifts', shiftController.getShifts);
// update shift
router.patch('/updateShift/:id', shiftController.updateShift);
// delete shift
router.delete('/deleteShift/:id', shiftController.deleteShift);

module.exports = router;
