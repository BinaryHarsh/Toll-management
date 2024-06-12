import React, { useEffect, useState } from "react";
import Configurator from "examples/Configurator";
import brandWhite from "assets/images/images (1).jpeg";
import brandDark from "assets/images/logo-ct-dark.png";
import MDBox from "components/MDBox";
import { Icon } from "@mui/material";
import Sidenav from "examples/Sidenav";
import router from "../../sidebarlist";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { useDispatch, useSelector } from "react-redux";
import { transaction_vehicle_slice } from "../../redux/slices/vehicle.slice";
import { statisticslice } from "../../redux/slices/statistic.slice";
import { allmasterslice } from "../../redux/slices/allmaster.slice";

function Sidebarlayout({ children }) {
  const redux_dispatch = useDispatch();
  const modules = JSON.parse(localStorage.getItem("auth"))?.permission?.permissions?.modules ?? [];
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

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    redux_dispatch(allmasterslice());
    redux_dispatch(transaction_vehicle_slice("DAY"));
    redux_dispatch(statisticslice());
  }, [redux_dispatch]);

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

  const routes = router.filter((val) => {
    const findobj = modules.find((value) => value.module_id == val.module_id);
    return findobj;
  });

  return (
    <>
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Transportation"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      {children}
    </>
  );
}
export default Sidebarlayout;
