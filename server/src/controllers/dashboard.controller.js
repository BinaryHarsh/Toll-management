const catchAsync = require('../utils/catchAsync');
const dashboardService = require('../services/dashboard.service');


const getAllStatistics = catchAsync(async (req, res, next) => {
  const LaneInformationData = await dashboardService.getLaneInformation();
  const LastFiveTransactiondata = await dashboardService.getLastFiveTransaction();
  const getCount = await dashboardService.getCount();
  const getRevenue = await dashboardService.getRevenue();
  return res.status(200).json({
    status: 'success',
    data: {
      laneInformation: LaneInformationData,
      lastFiveTransaction: LastFiveTransactiondata,
      getCount: getCount,
      getRevenue: getRevenue,
    },
  });
});

const getTransactionAndVehicle = catchAsync(async (req, res, next) => {
  const duration = req.params.duration
  const TransactionStatusData = await dashboardService.getTransactionStatus(duration);
  const vehicleClassificationData = await dashboardService.getVehicleClassification(duration);
  return res.status(200).json({
    status: 'success',
    transactionStatus: TransactionStatusData,
    vehicleClassification: vehicleClassificationData
  });
});
module.exports = {
  getAllStatistics,
  getTransactionAndVehicle
}