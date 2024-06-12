import { useState, useEffect,memo } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Transactiondetail from "./component/transaction.detail";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import FullWidthTabs from "./component/tabpanels";
import { useDispatch } from "react-redux";
import { download_report} from "../../redux/slices/downloadreport.slice";
function Report({ children }) {
  const dispatch=useDispatch();
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
    // allreports();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const allreports=async()=>{
    try{
     if(window.location.pathname == "/reports"){
      dispatch(download_report());
      // await callapi(apiurls.allreports,{},"GET");
     } 
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    allreports();
  },[dispatch])
  setInterval(allreports,5000);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Transactiondetail/> */}
      <FullWidthTabs/>
      <Footer/>
    </DashboardLayout>
  );
}

// Setting default props for the Header
Report.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Report.propTypes = {
  children: PropTypes.node,
};

export default memo(Report);
