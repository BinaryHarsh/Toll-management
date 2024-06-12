const express = require('express');
const router = express.Router();
const laneController = require('../controllers/laneMaster.controller');
const validate = require('../middlewares/validate');
const laneValidation = require('../validations/lane.validation');

// Create Lane
router.post('/createLane', validate(laneValidation.createLane), laneController.createLane);
// Get All Lane
router.get('/getAllLane', laneController.getAllLane);
//Update Lane
router.put('/update', validate(laneValidation.updateLane), laneController.updateLane);
//Delete Lane
router.delete('/delete', laneController.deleteLane);
//Update Lane Status
router.put('/updateStatus', laneController.updateStatus);
//Get Lane By Id
router.get('/getLaneById', laneController.getLaneById);

module.exports = router;
