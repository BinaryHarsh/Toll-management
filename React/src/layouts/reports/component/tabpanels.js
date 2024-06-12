import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MDBox from "components/MDBox";
import Transactiondetail from "./transaction.detail";
import Transactionsummary from "./transaction.summary";
import Transactionrevenue from "./transaction.revenue";
import Transactionavc from "./transaction.avc";
import Downloadreport from "./download.report";
import { Icon } from "@mui/material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labell
      edby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <MDBox>
      {/* <Box sx={{ bgcolor: 'background.paper', width: "100%" }}> */}
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Details Report" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>description</Icon>}{...a11yProps(0)} />
          <Tab label="Summary Report" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>summarize</Icon>} {...a11yProps(1)} />
          <Tab label="Revenue Report"icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>grading</Icon>} {...a11yProps(2)} />
          {/* <Tab label="Toll Files Status" disabled icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>summarize</Icon>}{...a11yProps(2)} /> */}
          {/* <Tab label="AVC Report" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>assignment</Icon>}{...a11yProps(2)} /> */}
          <Tab label="Download Report" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>download</Icon>}{...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          style={{ margin: "-4px -20px 0px -20px" }}
          value={value}
          index={0}
          dir={theme.direction}
        >
          <Transactiondetail index={0} type="detail" />
        </TabPanel>
        <TabPanel
          style={{ margin: "-4px -20px 0px -20px" }}
          value={value}
          index={1}
          dir={theme.direction}
        >
          <Transactionsummary index={1} type="summary" />
        </TabPanel>
        <TabPanel
          style={{ margin: "-4px -20px 0px -20px" }}
          value={value}
          index={2}
          dir={theme.direction}
        >
          <Transactionrevenue index={2} type="revenue" />
        </TabPanel>
        <TabPanel
          style={{ margin: "-4px -20px 0px -20px" }}
          value={value}
          index={3}
          dir={theme.direction}
        ></TabPanel>
        {/* <TabPanel
          style={{ margin: "-4px -20px 0px -20px" }}
          value={value}
          index={4}
          dir={theme.direction}
        >
          <Transactionavc index={4} type="avc" />
        </TabPanel> */}
        <TabPanel
          style={{ margin: "-4px -20px 0px -20px" }}
          value={value}
          index={5}
          dir={theme.direction}
        >
          <Downloadreport index={5} type="download" />
        </TabPanel>
      </SwipeableViews>
    </MDBox>
  );
}
