import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import { useMasterData } from "@/stores/common";

const routes = [
  {
    path: "/",
    redirect: "/sign-in",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/Login.vue"),
        meta: {
          pageTitle: "Sign In",
          moduleName: "Sign In",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () => import("@/views/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
          moduleName: "Password reset",
        },
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          moduleName: "Dashboard",
        },
      },
      {
        path: "/reports",
        component: () => import("@/views/adminReports.vue"),
        meta: {
          middleware: "auth",
          moduleName: "admin Reports",
        },
        children: [
          {
            path: "/transaction-details-report",
            name: "transactionDetailsReport",
            component: () =>
              import("@/components/admin-report/transactionDetails.vue"),
            meta: {
              pageTitle: "Reports - Transaction Details Report",
              subModuleName: "Transaction Details Report",
            },
          },
          {
            path: "/transaction-summary-report",
            name: "VehicleSummaryReport",
            component: () =>
              import("@/components/admin-report/transactionSummary.vue"),
            meta: {
              pageTitle: "Reports - Transaction Summary Report",
              subModuleName: "Transaction Summary Report",
            },
          },
          {
            path: "/transaction-revenue-report",
            name: "VehicleRevenueReport",
            component: () =>
              import("@/components/admin-report/revenueSummary.vue"),
            meta: {
              pageTitle: "Reports - Transaction Revenue Report",
              subModuleName: "Transaction Revenue Report",
            },
          },
          {
            path: "/transaction-avc-report",
            name: "AvcRevenueReport",
            component: () =>
              import("@/components/admin-report/AvcFilter.vue"),
            meta: {
              pageTitle: "Reports - Transaction Avc Report",
              subModuleName: "Transaction Avc Report",
            },
          },
          {
            path: "/download-reports",
            name: "downloadReport",
            component: () =>
              import("@/components/admin-report/downloadReport.vue"),
            meta: {
              pageTitle: "Download-Reports",
              subModuleName: "Download Report",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/reports-view/:id",
    name: "ViewTransaction",
    component: () => import("../components/admin-report/DetailsTransactionVeiw.vue"),
    meta: {
      pageTitle: "Transaction View Details",
      ModuleName: "Transaction View",
    },
  },
  {
    path: "/lanes",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      moduleName: "Lane Status",
    },
    children: [
      {
        path: "/edit-lane-details",
        name: "edit-lane",
        component: () => import("@/views/EditLaneDetails.vue"),
        meta: {
          pageTitle: "Edit Lane",
          moduleName: "Lane Status",
        },
      },
      {
        path: "/view-lane-details",
        name: "view-lane",
        component: () => import("@/views/ViewLaneDetail.vue"),
        meta: {
          pageTitle: "View Lane",
          moduleName: "Lane Status",
        },
      },
    ],
  },



  {
    path: "/transactions",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      moduleName: "Transaction Validate",
    },
    children: [
      {
        path: "/transactions",
        name: "transaction-validate",
        component: () => import("@/views/TransactionValidate.vue"),
        meta: {
          pageTitle: "Transaction Validate",
          moduleName: "Transaction Validate",
        },
      },
      {
        path: "/transactions/:id",
        name: "transaction-details",
        component: () => import("@/views/TransactionDetails.vue"),
        meta: {
          pageTitle: "Transaction Details",
          moduleName: "Transaction Validate",
        },
      },
    ],
  },



  {
    path: "/cashup",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      moduleName: "Cashup",
    },
    children: [
      {
        path: "/cashup",
        name: "cashup",
        component: () => import("@/views/Cashup.vue"),
        meta: {
          pageTitle: "Cashup",
          moduleName: "Cashup",
        },
        children: [
          {
            path: "/cashup-mid-shift",
            name: "Mid Shift Cashup",
            component: () =>
              import("@/components/Cashup/midShiftCashUp.vue"),
            meta: {
              pageTitle: "Mid Shift Cashup",
              subModuleName: "Cashup",
            },
          },
          {
            path: "/collector-cashup",
            name: "Collector CashUp",
            component: () =>
              import("@/components/Cashup/collectorCashUp.vue"),
            meta: {
              pageTitle: "collector-cashup",
              subModuleName: "Cashup",
            },
          },
          {
            path: "/cashier-cash",
            name: "Cashier Cash",
            component: () =>
              import("@/components/Cashup/cashierCashUp.vue"),
            meta: {
              pageTitle: "Cashier Cash",
              subModuleName: "Cashup",
            },
          },
          {
            path: "/cashup-report",
            name: "Cashup Report ",
            component: () =>
              import("@/components/Cashup/cashUpReport.vue"),
            meta: {
              pageTitle: "Cashup Report",
              subModuleName: "Cashup",
            },
          },
        ]
      }
    ]
  },

  {
    path: "/shifts",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      moduleName: "Shift Management",
    },
    children: [
      {
        path: "/shifts",
        name: "shift-management",
        component: () => import("@/views/ShiftManagement.vue"),
        meta: {
          pageTitle: "Shift Management",
          moduleName: "Shift Management",
        },
      },
    ],
  },



  {
    path: "/configuration",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      moduleName: "Configuration",
    },
    children: [
      {
        path: "/lane-creation",
        name: "LaneCreation",
        component: () => import("@/views/configuration/LaneCreation.vue"),
        meta: {
          pageTitle: "Lane Creation",
          subModuleName: "Lane Creation",
        },
      },
      {
        path: "/lane-device-configuration",
        name: "LaneDeviceConfiguration",
        component: () =>
          import("@/views/configuration/LaneDeviceConfiguration.vue"),
        meta: {
          pageTitle: "Lane Device Configuration",
          subModuleName: "Lane Device Configuration",
        },
      },
      {
        path: "/vehicle-class-creation",
        name: "VehicleClassCreation",
        component: () =>
          import("@/views/configuration/VehicleClassCreation.vue"),
        meta: {
          pageTitle: "Vehicle Class Creation",
          subModuleName: "Vehicle Class Creation",
        },
      },
      {
        path: "/fare-creation",
        name: "FareCreation",
        component: () => import("@/views/configuration/FareCreation.vue"),
        meta: {
          pageTitle: "Fare Creation",
          subModuleName: "Fare Creation",
        },
      },
    ],
  },

  {
    path: "/users",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      moduleName: "User Management",
    },
    children: [
      {
        path: "/users",
        name: "user-management",
        component: () => import("@/views/UserManagement.vue"),
        meta: {
          pageTitle: "User Management",
          moduleName: "User Management",
        },
      },
    ],
  },
  {
    path: "/roles",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      moduleName: "Role Management",
    },
    children: [
      {
        path: "/roles",
        name: "role-management",
        component: () => import("@/views/RoleManagement.vue"),
        meta: {
          pageTitle: "Role Management",
          moduleName: "Role Management",
        },
      },
    ],
  },

  {
    path: "/transaction-cancellation",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
      moduleName: "Transaction Cancellation",
    },
    children: [
      {
        path: "/transaction-cancellation",
        name: "transaction-cancellation",
        component: () => import("@/views/TransactionCancellation.vue"),
        meta: {
          pageTitle: "Transaction Cancellation",
          moduleName: "Transaction Cancellation",
        },
      },
    ],
  },
  {
    path: "/system",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();
  const masterStore = useMasterData() as any;

  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  try {
    // verify auth token before each page change
    await authStore.verifyAuth();

    // before page access check if page requires authentication
    if (to.meta.middleware == "auth") {
      if (authStore.isAuthenticated) {
        if (masterStore.getMasters) {
          const allowedModules = masterStore.getMasters.moduleMaster
            .filter((m) =>
              authStore.user.info.permissions.modules.find(
                (um) => um.module_id === m.id
              )
            )
            .map((p) => p.module_name);

          if (
            allowedModules.indexOf(to.meta.moduleName) === -1 &&
            !to.meta.subModuleName
          ) {
            next({ name: "404" });
            return;
          }
        }

        next();
      } else {
        next({ name: "sign-in" });
      }
    } else {
      next();
    }
  } catch (e) {
    // console.error(e)
    next();
    // next({ name: "sign-in" });
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
