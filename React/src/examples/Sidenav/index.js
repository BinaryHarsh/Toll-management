import { useEffect, useState } from "react";
// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
// import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// Material Dashboard 2 React context
import {useMaterialUIController,setMiniSidenav,setTransparentSidenav,setWhiteSidenav,} from "context";
import {collapseItem,collapseIconBox,collapseIcon,collapseText,} from "examples/Sidenav/styles/sidenavCollapse";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
function Sidenav({ color, brand, brandName, routes, ...rest }) {
  
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const [open, setOpen] = useState([]);
  const handleClick = (index) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  };
  const closeSidenav = () => setMiniSidenav(dispatch, true);
  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }
    /** The event listener that's calling the handleMiniSidenav function when resizing the window.*/
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route, ref, children }, i) => {
      let returnValue;
      if (type === "collapse") {
        returnValue = children ? (
          <>
            <MDBox  onClick={() => handleClick(i)}
            style={{width:"auto"}}
             sx={(theme) =>
              collapseItem(theme, {
                transparentSidenav,
                whiteSidenav,
                darkMode,
                sidenavColor,
              })
            }
            >
              <ListItemIcon
                sx={(theme) =>collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode})}>
                {typeof icon === "string" ? (<Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>) : (icon)}
              </ListItemIcon>
              <ListItemText
                primary={name}
                sx={(theme) =>
                  collapseText(theme, {
                    miniSidenav,
                    transparentSidenav,
                    whiteSidenav
                  })}
              />
              {open[i] ? <KeyboardArrowDownIcon /> :<KeyboardArrowUpIcon />} 
            </MDBox>
            <Collapse in={open[i]} timeout="auto" unmountOnExit>
              <MDBox pl={2}>
                {children.map(({ childName, childKey, childRoute, childIcon }, i) => (
                  <NavLink key={i} to={childRoute}>
                    <SidenavCollapse
                      name={childName}
                      icon={childIcon}
                      active={childKey === collapseName}
                    />
                  </NavLink>
                ))}
              </MDBox>
            </Collapse>
          </>
        ) : (<NavLink key={key} to={route}>
            <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
          </NavLink>
        );
      }
      else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }
      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/dashboard" display="flex"  alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
      {/* <MDBox p={2} mt="auto">
        <MDButton
          component="a"
          href="https://www.creative-tim.com/product/material-dashboard-pro-react"
          target="_blank"
          rel="noreferrer"
          variant="gradient"
          color={sidenavColor}
          fullWidth
        >
          upgrade
        </MDButton>
      </MDBox> */}
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
