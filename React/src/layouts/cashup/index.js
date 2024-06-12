import { useState, useEffect,memo } from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CashupTabs from "./components/cashupTabs";
function Cashup({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);
    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();
    // allCashups();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CashupTabs/>
      <Footer/>
    </DashboardLayout>
  );
}

Cashup.defaultProps = {
  children: "",
};

Cashup.propTypes = {
  children: PropTypes.node,
};

export default memo(Cashup);
