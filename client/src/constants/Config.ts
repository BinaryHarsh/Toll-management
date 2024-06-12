export const CLIENT_URL = import.meta.env.VITE_APP_CLIENT_URL;
export const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  COMMON: {
    GET_ALL_MASTERS: "/common/getAllMaster",
  },
  ROLES: {
    CREATE_ROLE: "/roles/createRole",
    GET_ROLES: "/roles/getRoles",
    UPDATE_ROLES: "/roles/updateRole/",
    GET_ROLES_BY_ID: "/roles/getRoleById/",
    GET_PERMISSION: "/roles/getPermissionByRoleId/",
    GET_MODULES_SUBMODULES: "/roles/getAllModulesAndSubmodules",
    DELETE_ROLE: "/roles/deleteRole/",
  },
  USERS: {
    GET_USERS: "/users/getUsers",
    CREATE_USER: "/users/createNewUser",
    UPDATE_USER: "/users/updateUser/",
    DELETE_USER: "/users/deleteUser/",
  },
  SHIFT: {
    GET_SHIFT: "/shifts/getShifts",
    CREATE_SHIFT: "/shifts/createShift",
    UPDATE_SHIFT: "/shifts/updateShift/",
    DELETE_SHIFT: "/shifts/deleteShift/",
  },
  TRANSACTION_VALIDATE: {
    GET_TRANSACTION: "/transaction/getTransactions",
    GET_TRANSACTION_BY_ID: "/transaction/getTransactionByTxnId/",
    VALIDATE_TRANSACTION: "/transaction/updateValidation",
    GET_NEXT_TRANSACTION_BY_ID: "/transaction/getNextTransaction/",
    GET_PREVIOUS_TRANSACTION_BY_ID: "/transaction/getPreviousTransaction/",
    GET_ALL_VEHICLE_CLASS: "/transaction/getVehicleClass",
    CANCEL_TRANSACTION: "/transaction/cancelTransaction ",
    GET_TRANSACTION_FOR_CANCEL: "/transaction/getTransactionForCancel",
    GET_CANCELLED_TRANSACTION: "/transaction/getCancelledTransaction"
  },
  admin_REPORT: {
    GENERATE_REPORTS: "/report/generateReports",
    GET_REPORTS: "/report/getAllReports",
    FILTER_REPORT: "/transaction/adminFilterReport",
    COUNTS_TRANSACTION: "/report/getTransactionCount",
    VEHICLE_CLASS_AND_DATE_WISE: "/report/getCountClassWiseAndDateWise",
    GET_REVENUE: "/report/getRevenueTransaction",
    GET_REVENUE_VEHICLE_CLASS_DATE_WISE: "/report/getRevenueDateWise",
    AVC_TRANSACTION: "/report/getAvcTransactionCount",
    GET_REVENUE_LANE_WISE: '/report/getRevenueLaneWise',
    GET_COUNT_WITH_REVENUE: '/report/getCountWithRevenue',
    DELETE_FILE: '/report/deleteFile'
  },
  PAYMENT: {
    PAYMENT_SUBTYPE: "/transaction/getAllPaymentSubType",
    PAYMENT_TYPE: "/transaction/getAllPaymentType",
  },
  DEVICE: {
    CREATE_DEVICE: "/laneDevice/createDevice",
    DELETE_DEVICE: "/laneDevice/deleteDevice",
    UPDATE_STATUS: "/laneDevice/updateStatus",
    UPDATE_DEVICE: "/laneDevice/updateDevice",
    GET_ALL_DEVICES: "/laneDevice/getAllDevice"
  },
  DASHBOARD: {
    STATISTICS: "/dashboard/getAllStatistics",
    COUNTTRANSCATION: "/dashboard/getTransactionAndVehicleStatistics"
  },
  LANE: {
    GET_ALL_LANES: "/lane/getAllLane",
    CREATE_LANE: "/lane/createLane",
    UPDATE_LANE: "/lane/update",
    DELETE_LANE: "/lane/delete",
    GET_LANE_BY_ID: "/lane/getLaneByid",
    UPDATE_LANE_STATUS: "/lane/updateStatus",
  },
  FARE: {
    GET_FARE_BY_RE_VEH_CLASS: "/fare/fareValue",
    GET_FARE: "/fare/getFare",
    CREATE_FARE: "/fare/createFare",
    UPDATE_FARE: "/fare/updateFare/"
  },
  VEHICLE: {
    CREATE_VEHICLE: "/vehicle/createVehicle",
    DELETE_VEHICLE: "/vehicle/deleteVehicle/",
    UPDATE_VEHICLE: "vehicle/updateVehicle/"
  },
  CASHUP: {
    GETDENOMENATIONS: '/cashup/getDenominations',
    CREATECASHUP: '/cashup/createCashUp',
    GET_CASHUPID: '/cashup/getMidCashUpID',
    GET_CASHUPDATA: '/cashup/getMidCashUpData',
    UPDATECASHUP: '/cashup/updateCashUp',
    GETCASHUPDATA: '/cashup/getCashUpData'
  }
};
