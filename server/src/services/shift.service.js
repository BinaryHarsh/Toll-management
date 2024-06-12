const { db } = require('../models');

// create shift
const createShift = async (shiftData) => {
  const shift = await db.admin_master_shifts.findOne({ where: { shift_name: shiftData.shift_name } });

  if (shift) throw new Error('Shift is already exist');

  const data = await db.admin_master_shifts.create({
    shift_name: shiftData.shift_name,
    shift_start_time: shiftData.shift_start_time,
    shift_end_time: shiftData.shift_end_time,
    is_active: shiftData.is_active,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  return data;
};

// get shifts
const getShifts = async () => {
  const getShifts = await db.admin_master_shifts.findAll();
  return getShifts;
};

// update shifts
const updateShift = async (id, updatedData) => {
  const shift = await db.admin_master_shifts.findOne({ where: { id } });
  if (!shift) {
    throw new Error('shift not found');
  }
  // Update the shift data
  shift.shift_name = updatedData.shift_name;
  shift.shift_start_time = updatedData.shift_start_time;
  shift.shift_end_time = updatedData.shift_end_time;
  (shift.updated_at = new Date().toISOString()),
    // Save the updated shift
    await shift.save();
  return shift;
};

// delete shifts
const deleteShift = async (id) => {
  const shift = await db.admin_master_shifts.findOne({ where: { id } });
  if (!shift) {
    throw new Error('shift not found');
  }

  const isMapWithUser = await db.admin_user_shift_mappings.findOne({ where: { shift_id: id } });
  if (isMapWithUser) throw new Error('This shift is already assigned to user');

  await db.admin_master_shifts.destroy({ where: { id } });
  return { message: 'Shift deleted successfully' };
};

module.exports = {
  createShift,
  getShifts,
  updateShift,
  deleteShift,
};
