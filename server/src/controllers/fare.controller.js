const catchAsync = require('../utils/catchAsync');
const fareService = require('../services/fare.service');

const getFareVehClass = catchAsync(async (req, res, next) => {
  const getFare = await fareService.getVehicleClassFare(req.query.ReVehClassName);
  res.status(200).json({
    status: 'success',
    data: getFare,
  });
});

const getAllFare = catchAsync(async (req, res, next) => {
  const getFare = await fareService.getAllFare();
  res.status(200).json({
    status: 'success',
    data: getFare,
  });
});

const createFare = catchAsync(async (req, res, next) => {
  const data = await fareService.createFare(req.body);
  res.status(200).json({
    status: 'Successfully Created Fare',
    data: data,
  });
});

const updateFare = catchAsync(async (req, res, next) => {
  const data = await fareService.updateFare(req.body, req.params.fareId);
  res.status(200).json({
    status: 'Successfully Updated Fare',
    data: data,
  });
});

const deleteFare = catchAsync(async (req, res, next) => {
  const data = await fareService.deleteFare(req.params.fareId);
  res.status(200).json({
    status: 'Successfully Deleted Fare',
    data: data,
  });
});
module.exports = {
  getFareVehClass,
  createFare,
  updateFare,
  deleteFare,
  getAllFare,
};
