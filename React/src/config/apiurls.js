export const apiurls={
    statistics:"/dashboard/getAllStatistics",
    allmaster:"/common/getAllMaster",
    
    getTransactionAndVehicleStatistics:"/dashboard/getTransactionAndVehicleStatistics",
    
    allreports:"/report/getAllReports",
    revenue_report:"/report/getRevenueTransaction",
    summary_report:"/report/getTransactionCount",
    avc_report:"/report/getAvcTransactionCount",
    generatereport:"/report/generateReports",

    submitCashup:"/cashup/createCashUp",
    loadmidCashup:"cashup/getMidCashUpData",
    updateCollector:"/cashup/updateCashUp",
    
    

    session:"/auth/session",
    login:"/auth/login",
    
    forgot_password:"/forgot_password",
    masterfile:"/report/master-table",
    toll_files:"/report/toll-files",
    
    getreport:"/transaction/adminFilterReport",

    cancel_transaction:"/transaction/cancelTransaction",
    transaction:"/transaction/getTransactions",
    transactionbyid:"/transaction/getTransactionByTxnId",
    transaction_cancel:"/transaction/getTransactionForCancel",
    vehicle_class:"/transaction/getVehicleClass/",
    fare_creation:"/fare/getFare",
    demonination:"/cashup/getDenominations",

    searchcashupReport:"/cashup/getCashUpData",

    vehicleCreate:"/vehicle/createVehicle",
    vehicleUpdate:"/vehicle/updateVehicle",

    fareCreate:"/fare/createFare",
    fareEdit:"/fare/updateFare",

    users:"/users/getUsers",
    usercreate:"/users/createNewUser",
    updateUser:"/users/updateUser",
    deleteUser:"/users/deleteUser",

    shifts:"/shifts/getShifts",
    createShift:"/shifts/createShift",
    updateShift:"/shifts/updateShift",
    deleteShift:"/shifts/deleteShift",

    roles:"/roles/getRoles",
    createRoles:"/roles/createRole",
    updateRoles:"/roles/updateRole",
    getroleById: "/roles/getRoleById/",
    deleteRole: "/roles/deleteRole",
    rolegetPermissionbyId: "/roles/getPermissionByRoleId/",
    getRoleModulesubModule: "/roles/getAllModulesAndSubmodules",
    
    
};