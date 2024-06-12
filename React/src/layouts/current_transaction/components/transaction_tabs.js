import React,{useState} from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MDBox from "components/MDBox";
import { Card, Icon, TextField } from "@mui/material";
import Mastertransaction from "./master_transaction";
import Filetransaction from "./file_transaction";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-label
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

export default function Transactions_tabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <MDBox mt={2}>
      {/* <Box sx={{ bgcolor: 'background.paper', width: "100%" }}> */}
      <AppBar position="static" 
      sx={{maxWidth:"40%"}}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Master Transaction" 
           icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>person</Icon>
           }{...a11yProps(0)} />
          <Tab label="File Transaction" 
          icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>description</Icon>
           }
          {...a11yProps(1)} />
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
          <Mastertransaction/>
        </TabPanel>
        <TabPanel
          style={{ margin: "-4px -20px 0px -20px" }}
          value={value}
          index={1}
          dir={theme.direction}
        >
          <Filetransaction/>
        </TabPanel>
      </SwipeableViews>
    </MDBox>
  );
}
