import Loder from "components/Loader/loder";
import Guard from "guard";
import Sidebarlayout from "layouts/view/sidebar.layout";
import React, { Fragment, Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const lazywithRetry = (componentImport) =>
  lazy(async () => {
    try {
      const component = await componentImport();
      return component;
    } catch (error) {
      console.log(error);
    }
  });

const defaultlayout = ({ children }) => {
  return<>{ children }</> ;
};
export function LazyLoading() {
  return (
    <>
      <Suspense fallback={<Loder/>}>
        <Routes>
        {routes.map((route, i) => {
            const Layout = route?.layout || Fragment;
            const Guard = route?.guard || Fragment;
            const Component = route.element;
            return (
              <Route
                key={i}
                path={route.path}
                exact={true}
                element={
                  <Guard>
                    <Layout>
                      <Component />
                    </Layout>
                  </Guard>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
}
const routes = [
  {
    
    layout: defaultlayout,
    path: "*",
    element: lazywithRetry(() => import("./layouts/authentication/Error404.js")),
  },
  
  {
    layout: defaultlayout,
    path: "/",
    element: lazywithRetry(() => import("./layouts/authentication/sign-in")),
  },
  {
    layout: defaultlayout,
    path: "/login",
    element: lazywithRetry(() => import("./layouts/authentication/sign-in")),
  },
  {
    layout: defaultlayout,
    path: "/password-reset",
    element: lazywithRetry(() => import("./layouts/authentication/reset-password/cover")),
  },
  {
    layout: defaultlayout,
    path: "/profile",
    element: lazywithRetry(() => import("./layouts/profile")),
  },
  { 
    guard:Guard,
    layout: Sidebarlayout,
    path: "/dashboard",
    element: lazywithRetry(() => import("./layouts/dashboard")),
  },
  {
    guard:Guard,
    layout: Sidebarlayout,
    path: "/transaction-validator",
    element: lazywithRetry(() => import("./layouts/transaction_Validate")),
  },
  {
    guard:Guard,
    layout: Sidebarlayout,
    path: "/current-transaction",
    element: lazywithRetry(() => import("./layouts/current_transaction")),
  },
  {
    guard:Guard,
    layout: Sidebarlayout,
    path: "/users",
    element: lazywithRetry(() => import("./layouts/user_management")),
  },{
    guard:Guard,
    layout: Sidebarlayout,
    path: "/roles",
    element: lazywithRetry(() => import("./layouts/role_management")),
  },
  {
    guard:Guard,
    layout: Sidebarlayout,
    path: "/shifts",
    element: lazywithRetry(() => import("./layouts/shift_management")),
  },
  {
    guard:Guard,
    layout: Sidebarlayout,
    path: "/transaction-cancelllation",
    element: lazywithRetry(() => import("./layouts/transaction_cancellation")),
  },
  { 
    guard:Guard,
    layout: Sidebarlayout,
    path: "/reports",
    element: lazywithRetry(() => import("./layouts/reports")),
  },
  { 
    guard:Guard,
    layout: Sidebarlayout,
    path: "/cashup",
    element: lazywithRetry(() => import("./layouts/cashup")),
  },
  { 
    guard:Guard,
    layout: Sidebarlayout,
    path: "/transaction-details/:id?",
    element: lazywithRetry(() => import("./layouts/transaction_details")),
  },
  { 
    guard:Guard,
    layout: Sidebarlayout,
    path: "/transaction-report-details/:id?",
    element: lazywithRetry(() => import("./layouts/reports/component/detailsview.report")),
  },
  { 
    guard:Guard,
    layout: Sidebarlayout,
    path: "/vehicle-class-creation",
    element: lazywithRetry(() => import("./layouts/configuration/vehicle_class_creation.js")),
  },
  { 
    guard:Guard,
    layout: Sidebarlayout,
    path: "/fare-creation",
    element: lazywithRetry(() => import("./layouts/configuration/fare_creation.js")),
  }

];
