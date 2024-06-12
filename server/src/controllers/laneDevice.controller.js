const catchAsync = require('../utils/catchAsync');
const laneDeviceService = require('../services/laneDevice.service');

// Create Device Controller
const createDevice = catchAsync(async (req, res, next) => {
  const device = await laneDeviceService.createDevice(req.body);
  res.status(201).json({
    status: 'success',
    data: device,
  });
});

// Get All Device Controller
const getAllDevice = catchAsync(async (req, res, next) => {
  const getData = await laneDeviceService.getAllDevice();
  res.status(200).json({ status: 'success', data: getData });
});

// Update Device Controller
const updateDevice = catchAsync(async (req, res, next) => {
  const id = req.query.id;
  const updatedData = await laneDeviceService.deviceUpdate(req.body, id);
  res.status(200).json({ status: 'Update_successfully', data: updatedData });
});

//Delete Device Controller
const deleteDevice = catchAsync(async (req, res, next) => {
  const id = req.query.id;
  const deleteData = await laneDeviceService.deviceDelete(id);
  res.status(200).json({ status: 'delete_successfully', data: deleteData });
});

//Change Device Status Controller
const updateStatus = catchAsync(async (req, res, next) => {
  const id = req.query.id;
  const statusData = await laneDeviceService.statusUpdate(id);
  res.status(200).json({ status: 'update_status_successfully', data: statusData });
});
module.exports = { createDevice, getAllDevice, updateDevice, deleteDevice, updateStatus };
