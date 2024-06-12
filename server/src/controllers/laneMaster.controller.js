const catchAsync = require('../utils/catchAsync');
const laneMasterService = require('../services/laneMaster.service');

// Create Lane Controller
const createLane = catchAsync(async (req, res, next) => {
  const lane = await laneMasterService.createLane(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      lane,
    },
  });
});

// Get All Lane
const getAllLane = catchAsync(async (req, res, next) => {
  const getData = await laneMasterService.getAllLane();
  res.status(200).json({ status: 'success', data: getData });
});

// Get Lane By Id
const getLaneById = catchAsync(async (req, res, next) => {
  const id = req.query.laneid;
  const getData = await laneMasterService.getLaneByid(id);
  res.status(200).json({ status: 'success', data: getData });
});

// Update Lane Controller
const updateLane = catchAsync(async (req, res, next) => {
  const id = req.query.laneid;
  const updatedData = await laneMasterService.laneUpdate(req.body, id);
  res.status(200).json({ status: 'Update_successfully', data: updatedData });
});

//Delete Lane Controller
const deleteLane = catchAsync(async (req, res, next) => {
  const id = req.query.laneid;
  const deleteData = await laneMasterService.laneDelete(id);
  res.status(200).json({ status: 'delete_successfully', data: deleteData });
});

// Update Status Lane Like:- Active and Deactive
const updateStatus = catchAsync(async (req, res, next) => {
  const id = req.query.laneid;
  const statusData = await laneMasterService.statusUpdate(id);
  res.status(200).json({ status: 'update_status_successfully', data: statusData });
});
module.exports = { createLane, getAllLane, updateLane, deleteLane, updateStatus, getLaneById };
