const express = require('express');
const router = express.Router();
const fare = require('../controllers/fare.controller');
const validate = require('../middlewares/validate');
const fareValidation = require('../validations/fare.validation');

router.get('/fareValue', fare.getFareVehClass);
router.get('/getFare', fare.getAllFare);
router.post('/createFare', validate(fareValidation.fareSchema), fare.createFare);
router.put('/updateFare/:fareId', validate(fareValidation.updateSchema), fare.updateFare);
router.delete('/deleteFare/:fareId', fare.deleteFare);

module.exports = router;
