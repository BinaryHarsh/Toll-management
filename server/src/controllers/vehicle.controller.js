const catchAsync = require('../utils/catchAsync');
const vehicleService = require('../services/vehicle.service.js');

const createVehicle = catchAsync(async (req, res) => {
  const createData = await vehicleService.createVehicle(req.body);
  return res.send({
    status: 'successfully create vehicle',
    data: createData,
  });
});
const getVehicle = catchAsync(async (req, res) => {
  const createData = await vehicleService.getAllVechicle(req.body);
  return res.send({
    status: 'successfully create vehicle',
    data: createData,
  });
});
const updateVehicle = catchAsync(async (req, res) => {
  const Data = await vehicleService.updateVehicle(req.body, req.params.classNumber);
  return res.send({
    status: 'successfully update vehicle',
    data: Data,
  });
});

const deleteVehicle = catchAsync(async (req, res) => {
  const Data = await vehicleService.deleteVehicle(req.params.classNumber);
  return res.send({
    status: 'successfully delete vehicle',
    data: Data,
  });
});
module.exports = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicle,
};
