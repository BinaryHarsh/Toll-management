import { useEffect, useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import MDAlert from "components/MDAlert";
import { Grid } from "@mui/material";
import { useMaterialUIController } from "context";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";

function Transvehicle() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [value, setValue] = useState("DAY");
  const [data,setData] = useState({})
  const getdata = async () => {
    const apiresponse = await callapi(`${apiurls.getTransactionAndVehicleStatistics}/${value}`,{},"GET");
    let data = apiresponse?.data?.vehicleClassification
    let labels = Object.keys(data)
    let values = Object.values(data)
    setData({["label"]:labels,["values"]:values})
  };
  console.log(data);
  useEffect(() => {
    // console.log(1)
    getdata();
  }, [value]);
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Projects
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <MDBox sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ height: "-webkit-fill-available" }}
              >
                Filter By
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minHeight: "2.5rem" }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="Filter By"
              >
                <MenuItem value="DAY">DAY</MenuItem>
                <MenuItem value="WEEK">WEEK</MenuItem>
                <MenuItem value="MONTH">MONTH</MenuItem>
                <MenuItem value="YEAR">YEAR</MenuItem>
              </Select>
            </FormControl>
          </MDBox>
        </MDBox>
      </MDBox>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MDBox
            p={2}
            ml={2}
            mb={2}
            borderRadius="lg"
            bgColor={darkMode ? "transparent" : "grey-100"}
          >
            <MDBox >
              {data != undefined && 
              <DefaultDoughnutChart
              icon={{
                component: "leaderboard",
                color: "info",
              }}
              cutout={60}
              title="Previous Plaza Count"
              description=""
              chart={{
                labels: data.label,
                datasets: [
                  {
                    // label: "Series",
                    // color: "success",
                    data: data.values,
                  },
                ],
              }}
              />}
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={6}>
          <MDBox
            p={2}
            mr={2}
            mb={2}
            borderRadius="lg"
            bgColor={darkMode ? "transparent" : "grey-100"}
          >
            <MDTypography>Harsh</MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Transvehicle;
