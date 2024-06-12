const catchAsync = require('../utils/catchAsync');
const shiftService = require('../services/shift.service');

//  create Role
const createShift = catchAsync(async (req, res, next) => {
  const shift = await shiftService.createShift(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      shift,
    },
  });
});

// get Shifts
const getShifts = catchAsync(async (req, res, next) => {
  const allShifts = await shiftService.getShifts();
  res.status(201).json({
    status: 'success',
    data: {
      allShifts,
    },
  });
});

// updated Shift
const updateShift = catchAsync(async (req, res, next) => {
  const updatedShift = await shiftService.updateShift(req.params.id, req.body);
  res.status(201).json({
    status: 'success',
    data: {
      shift: updatedShift,
    },
  });
});

// delete Shift
const deleteShift = catchAsync(async (req, res, next) => {
  const deletedShift = await shiftService.deleteShift(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      shift: deletedShift,
    },
  });
});

module.exports = {
  createShift,
  getShifts,
  updateShift,
  deleteShift,
};
