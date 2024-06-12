import { useState, useEffect, useMemo, lazy, Suspense, Fragment } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { useDispatch } from "react-redux";
import { LazyLoading } from "route_path";
export default function App() {
  const toolkitdispatch = useDispatch();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // useEffect(() => {
  //   toolkitdispatch(transaction_vehicle_slice("DAY"));
  //   toolkitdispatch(statisticslice());
  //   toolkitdispatch(allmasterslice());
  // }, [toolkitdispatch]);
  // Setting the dir attribute for the body element
  // useEffect(() => {
  //   document.body.setAttribute("dir", direction);
  // }, [direction]);
  // Setting page scroll to 0 when changing the route

  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  // }, []);
  // pathname

  // const getRoutes = (allRoutes) =>
  //   allRoutes.map((route) => {
  //     if (route.collapse) {
  //       return getRoutes(route.collapse);
  //     }
  //     if (route.route) {
  //       return (
  //         <>
  //           <Route
  //             exact
  //             path="/transaction-details/:id/:type?"
  //             element={<Transaction_details />}
  //             key="detail"
  //           />
  //           <Route exact path="/sign-in" element={<Sign_in />} key="sign_in" />
  //           <Route
  //             exact
  //             path={route.route}
  //             element={<Redux>{route?.component}</Redux>}
  //             key={route.key}
  //           />
  //           <Route path="*" element={<Navigate to="/sign-in" />} />
  //         </>
  //       );
  //     }
  //     return null;
  //   });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <LazyLoading/>
      {/* 
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Transaction"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      */}
    </ThemeProvider>
  );
}
