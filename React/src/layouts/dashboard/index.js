import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { staticIsLoading } from "../../redux/slices/statistic.slice";
import DataTable from "examples/Tables/DataTable";
import { memo, useEffect, useMemo, useState } from "react";
import MDTypography from "components/MDTypography";
import { Card } from "@mui/material";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import Loder from "components/Loader/loder";
import { transaction_vehicle_slice } from "../../redux/slices/vehicle.slice";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
function Dashboard() {
  const dispatch = useDispatch();
  const transactionvehicle = useSelector((state) => state.transaction_and_vehicle.data);
  const static_data = useSelector((state) => state.statistics.data);
  const static_loading = useSelector(staticIsLoading);
  const [donut, setDonut] = useState({});
  const [fivetrans, setFivetrans] = useState([]);
  // const [flag, setFlag] = useState({ donut: true, static: true });
  const [lane, setLane] = useState({});
  const handletransaction = () => {
    if (transactionvehicle != "") {
      let data = transactionvehicle?.vehicleClassification;
      let data2 = transactionvehicle?.transactionStatus;
      setDonut((prev) => ({
        ...prev,
        chart: { label: Object.keys(data), value: Object.values(data) },
        transactions: { label: Object.keys(data2), value: Object.values(data2) },
      }));
    }
  };
  const changefilter = (e) => {
    dispatch(transaction_vehicle_slice(e.target.value));
  };
  const handlestaticdata = () => {
    if (static_data != "") {
      let keys = Object.keys(static_data?.data?.laneInformation.lhs);
      let lhs = Object.values(static_data?.data?.laneInformation.lhs);
      let rhs = Object.values(static_data?.data?.laneInformation.rhs);
      let array = static_data?.data?.lastFiveTransaction.map((val) => {
        let obj = {
          RE_VEH_PLATE: val.RE_VEH_PLATE,
          RE_PAYMENT_TYPE: val.RE_PAYMENT_TYPE,
          SHIFT_CODE: val.SHIFT_CODE,
        };
        return obj;
      });
      setLane({ keys, lhs, rhs });
      setFivetrans([...array]);
    }
  };
  useMemo(() => {
    handletransaction();
  }, [transactionvehicle]);
  useEffect(() => {handlestaticdata();}, [static_data]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {static_loading ? (
        <Loder />
      ) : (
        <MDBox py={3}>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox mb={-1}>
                      <Card sx={{ height: "100%" }}>
                        <MDBox
                          pt={2}
                          px={2}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <MDTypography variant="h6" sx={{textWrap:"nowrap",padding:"6px 5px"}} fontWeight="medium">
                            Payment Wise Classification Count
                          </MDTypography>
                          <Box sx={{ minWidth: 150 }}>
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
                                // value={filter}
                                defaultValue={"DAY"}
                                name="Filter By"
                                onChange={changefilter}
                                label="Filter By"
                              >
                                <MenuItem value="DAY">DAY</MenuItem>
                                <MenuItem value="WEEK">WEEK</MenuItem>
                                <MenuItem value="MONTH">MONTH</MenuItem>
                                <MenuItem value="YEAR">YEAR</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </MDBox>
                        <MDBox p={2}>
                          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                            {donut?.transactions?.label?.map((val, i) => (
                              <MDBox
                                key={i}
                                component="li"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                py={1}
                                pr={1}
                                mb={1}
                                shadow="xxl"
                                borderColor={"grey-900"}
                                borderRadius="lg"
                              >
                                <MDBox display="flex" justifyContent="space-between">
                                  <Icon fontSize="small">reorder</Icon>
                                  <MDTypography
                                    display="block"
                                    variant="button"
                                    fontWeight="medium"
                                  >
                                    {val}
                                  </MDTypography>
                                </MDBox>
                                <MDBox display="flex" alignItems="center">
                                  <MDTypography variant="button" fontWeight="regular" color="text">
                                    {donut?.transactions?.value[i]}
                                  </MDTypography>
                                  <MDBox
                                    display="flex"
                                    alignItems="center"
                                    lineHeight={1}
                                    ml={3}
                                    sx={{ cursor: "pointer" }}
                                  >
                                    {/* <MDTypography variant="button" fontWeight="bold">
                                      &#8377;
                                    </MDTypography> */}
                                  </MDBox>
                                </MDBox>
                              </MDBox>
                            ))}
                          </MDBox>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox>
                      <DefaultDoughnutChart
                        icon={{
                          component: "leaderboard",
                          color: "info",
                        }}
                        title="Vehicle Classification Count"
                        description=""
                        chart={{
                          labels: donut?.chart?.label,
                          datasets: [
                            {
                              data: donut?.chart?.value,
                            },
                          ],
                        }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={2}>
                  <DefaultLineChart
                    icon={{
                      component: "signpost",
                      color: "dark",
                    }}
                    title="Lane Information "
                    description=""
                    chart={{
                      labels: lane.keys,
                      datasets: [
                        {
                          label: "LHS",
                          borderColor: "blue",
                          backgroundColor: "blue",
                          color: "primary",
                          data: lane.lhs,
                          yAxisID: "y",
                        },
                        {
                          label: "RHS",
                          borderColor: "red",
                          backgroundColor: "red",
                          color: "success",
                          data: lane.rhs,
                          yAxisID: "y1",
                        },
                      ],
                    }}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <MDBox display="flex" alignItems="center" p={2}>
                    <MDBox
                      width="4rem"
                      height="4rem"
                      bgColor={"dark"}
                      variant="gradient"
                      coloredShadow={"dark"}
                      borderRadius="xl"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="white"
                      mt={-5}
                      mr={1}
                    >
                      <Icon fontSize="medium">payments</Icon>
                    </MDBox>
                    <MDBox mt={-1} ml={1}>
                      <MDTypography variant="h6">Last Five Transactions</MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox mb={3}>
                    {Array.isArray(static_data?.data?.lastFiveTransaction) != "" &&
                      static_data?.data?.lastFiveTransaction?.length !== 0 && (
                        <DataTable
                          table={{
                            columns: [
                              { Header: "Plate Number", accessor: "RE_VEH_PLATE", align: "left" },
                              { Header: "Payment", accessor: "RE_PAYMENT_TYPE", align: "left" },
                              { Header: "Shift", accessor: "SHIFT_CODE", align: "left" },
                            ],
                            rows: static_data?.data?.lastFiveTransaction,
                          }}
                          showTotalEntries={false}
                          isSorted={false}
                          noEndBorder
                          entriesPerPage={false}
                        />
                      )}
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <HorizontalBarChart
                    icon={{
                      component: "leaderboard",
                      color: "info",
                    }}
                    title="Previous Days Count"
                    description=""
                    chart={{
                      labels: static_data?.data?.getCount?.date,
                      datasets: [
                        {
                          label: "Series",
                          color: "success",
                          data: static_data?.data?.getCount?.countData,
                        },
                      ],
                    }}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <VerticalBarChart
                    icon={{
                      component: "store",
                      color: "success",
                    }}
                    title="Cash Collection "
                    description=""
                    chart={{
                      labels: static_data?.data?.getRevenue?.date,
                      datasets: [
                        {
                          label: "Collection",
                          color: "success",
                          data: static_data?.data?.getRevenue?.cashdata,
                        },
                      ],
                    }}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      )}
      <Footer />
    </DashboardLayout>
  );
}
export default memo(Dashboard);
