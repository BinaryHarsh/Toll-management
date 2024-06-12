const catchAsync = require('../utils/catchAsync');
const cashupService = require('../services/cashup.services');


const getDenominations = catchAsync(async (req, res, next) => {
    const data = await cashupService.getDenominations();
    return res.status(200).json({
        status: 'success',
        data: data,
    });
})


const createCashUp = catchAsync(async (req, res, next) => {
    const data = await cashupService.createCashUp(req.body);
    return res.status(200).json({
        status: 'success',
        data: data,
    });
})



const getMidCashUpID = catchAsync(async (req, res, next) => {
    const params = req.params.id
    const data = await cashupService.getMidCashUpID(params);
    return res.status(200).json({
        status: 'success',
        data: data,
    });
})

const getMidCashUpData = catchAsync(async (req, res, next) => {
    const params = req.params.id
    const data = await cashupService.getMidCashUpData(params);
    return res.status(200).json({
        status: 'success',
        data: data,
    });
})


const updateCashUp = catchAsync(async (req, res, next) => {
    const params = req.params.id
    const data = await cashupService.updateCashUp(req.body, params);
    return res.status(200).json({
        status: 'success',
        data: data,
    });
})


const getCashUpData = catchAsync(async (req, res, next) => {
    const { reportType } = req.body
    let data = null
    if (reportType == 'Shift-Collection-Report') {
        data = await cashupService.getShiftCollection(req.body);
    }
    else {
        data = await cashupService.getShortExcess(req.body);
    }
    res.status(200).json({
        status: 'sucess',
        data: data
    })
})

module.exports = {
    getDenominations,
    createCashUp,
    getMidCashUpID,
    getMidCashUpData,
    updateCashUp,
    getCashUpData
};