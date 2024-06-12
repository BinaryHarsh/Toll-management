// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import { DatePicker } from "rsuite";
// Material Dashboard 2 React components
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
import { useDispatch, useSelector } from "react-redux";
import MDButton from "components/MDButton";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "@mui/material";
import { setUserDefinedData, setUserDefinefilter } from "../../redux/slices/validation.slice";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import MDdatepicker from "components/RsuitDatepicker";
import { error } from "components/Loader/alertmessage";
function Transaction_validate() {
  const dispatch = useDispatch();
  const [page,setPage] = useState(1)
  const master_data = useSelector((state) => state?.master?.data?.data);
  const validation_list = useSelector((state) => state?.validate_list);
  const [tabledata, setTabledata] = useState([]);
  const [countobj, setCountobj] = useState({});
  const [filter, setFilter] = useState({});
  const navigate = useNavigate();
  // paymentType:'',plateNumber:'',from_date:'',to_date:'',abnormality:'',tagId:'',vehicleClass:'',laneType:'',transactionId:'',lane:''=
  const dispatchdata = () => {
    if (validation_list.data != "") {
      let obj = validation_list?.obj;
      let array =
        validation_list?.data?.transactions != undefined &&
        validation_list?.data?.transactions.length != 0 &&
        validation_list?.data?.transactions.map((val, i) => {
          let obj = {
            LANE_TRANS_ID: val.LANE_TRANS_ID,
            LANE_ID: val.LANE_ID,
            VEH_PLATE: val.VEH_PLATE,
            PASSAGE_TIME: val.PASSAGE_TIME,
            VEH_CLASS_DESCRIPTION: val.VEH_CLASS_DESCRIPTION,
            PAY_DESCRIPTION: val.PAY_DESCRIPTION,
            ABNORMALITY: val.ABNORMALITY,
            ACTION: (
              <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDButton
                  id={val.LANE_TRANS_ID}
                  key={i}
                  onClick={() => handleClick(val, i)}
                  endIcon={<VisibilityIcon />}
                >
                  View
                </MDButton>
              </MDBox>
            ),
          };
          return obj;
        });
      setFilter({
        fromDate: new Date(obj?.fromDate ?? ""),
        toDate: new Date(obj?.toDate ?? ""),
        plateNumber: obj?.plateNumber ?? "",
        paymentType: obj?.paymentType ?? "",
        lane: obj?.lane ?? "",
        abnormality: obj?.abnormality ?? "",
        tagId: obj?.tagId ?? "",
        vehicleClass: obj?.vehicleClass ?? "All",
        laneType: obj?.laneType ?? "All",
        transactionId: obj?.transactionId ?? "",
      });
      setTabledata(array);
      setCountobj({
        totalCount: validation_list?.data?.totalCount,
        totalPages: validation_list?.data?.totalPages,
      });
    }
  };
  
  const filterdata = async () => {
    try {
      const apiresponse = await callapi(`${apiurls.transaction}?page=${page}`, {}, "POST", filter);
      if (apiresponse?.data?.data.transactions == "") {
        error("Data Not Found");
        setTabledata([]);
        setCountobj({
          totalCount: 0,
          totalPages: 0,
        });
      }
      if (apiresponse?.data?.data.transactions != "") {
        dispatch(setUserDefinefilter(filter));
        dispatch(setUserDefinedData(apiresponse?.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(()=>{filterdata();},[page])

  useMemo(() => {
    dispatchdata();
  }, [validation_list]);

  const handleClick = (e, i) => {
    navigate(`/transaction-details/${e.LANE_TRANS_ID}`);
  };
  const handleChange = (e) => {
    setFilter((val) => ({ ...val, [e.target.name]: e.target.value }));
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={2}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                sx={{ maxWidth: "22%" }}
                display="flex"
              >
                <MDBox color="white">
                  <Icon fontSize="small">search</Icon>
                </MDBox>
                <MDTypography variant="h6" color="white">
                  Search by Filters
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container spacing={4}>
                  <Grid item xs={3}>
                    <MDdatepicker
                      ranges={[
                        {
                          label: "today",
                          value: new Date(),
                          placement: "bottom",
                        },
                      ]}
                      size="lg"
                      value={filter.fromDate}
                      label="From :-"
                      onChange={(val, e) => setFilter((value) => ({ ...value, ["fromDate"]: val }))}
                      format="dd MMM yyyy hh:mm:ss"
                      showMeridian
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Plate Number"
                      name="plateNumber"
                      value={filter.plateNumber}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ height: "-webkit-fill-available" }}
                        >
                          Payment Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          name="paymentType"
                          value={filter.paymentType ?? ""}
                          onChange={handleChange}
                          label="Payment Type"
                        >
                          <MenuItem value="All">All</MenuItem>
                          {master_data?.paymentTypeMaster != undefined &&
                            master_data?.paymentTypeMaster.map((val, i) => (
                              <MenuItem key={i} value={val.PAYMENTTYPE}>
                                {val.DESCRIPTION}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ height: "-webkit-fill-available" }}
                        >
                          Lane
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          value={filter.lane ?? ""}
                          name="lane"
                          onChange={handleChange}
                          label="Lane"
                        >
                          <MenuItem value="All">All</MenuItem>
                          {master_data?.laneMaster != undefined &&
                            master_data?.laneMaster.map((val, i) => (
                              <MenuItem key={i} value={val.LANE_NAME}>
                                {val.LANE_NAME}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <MDdatepicker
                      ranges={[
                        {
                          label: "today",
                          value: new Date(),
                          placement: "bottom",
                        },
                      ]}
                      label="To :-"
                      size="lg"
                      value={filter.toDate}
                      onChange={(val, e) => setFilter((value) => ({ ...value, ["toDate"]: val }))}
                      format="dd MMM yyyy hh:mm:ss"
                      showMeridian
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ height: "-webkit-fill-available" }}
                        >
                          Abnormality
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          value={filter.abnormality ?? ""}
                          name="abnormality"
                          onChange={handleChange}
                          label="Abnormality"
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="OK">OK</MenuItem>
                          <MenuItem value="NOT OK">NOT OK</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Tag Id"
                      name="tagId"
                      value={filter.tagId}
                      onChange={handleChange}
                      style={{ minHeight: "2.5rem" }}
                      // InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ height: "-webkit-fill-available" }}
                        >
                          Vehicle Class
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          value={filter.vehicleClass}
                          onChange={handleChange}
                          name="vehicleClass"
                          label="Vehicle Class"
                          // onChange={handleChange}
                        >
                          <MenuItem value="All">All</MenuItem>
                          {master_data?.vehicleClass != undefined &&
                            master_data?.vehicleClass.map((val, i) => (
                              <MenuItem key={i} value={val.CLASS_NO}>
                                {val.CLASS_DESCRIPTION}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ height: "-webkit-fill-available" }}
                        >
                          Lane Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          value={filter.laneType ?? "All"}
                          name="laneType"
                          onChange={handleChange}
                          label="Lane type"
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="EN">EN</MenuItem>
                          <MenuItem value="EX">EX</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Transaction Id"
                      name="transactionId"
                      value={filter.transactionId}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <MDButton
                      variant="contained"
                      onClick={filterdata}
                      color="success"
                      endIcon={<FilterAltIcon />}
                    >
                      Filter
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
            {tabledata != undefined && tabledata.length > 0 && (
              <MDBox pt={3}>
                <MDBox mb={2} pl={1} sx={{ maxWidth: "40%" }}>
                  <MDTypography>Total Count : {countobj.totalCount}</MDTypography>
                </MDBox>
                <DataTable
                  table={{
                    columns: [
                      { Header: "TXN ID", accessor: "LANE_TRANS_ID", align: "left" },
                      { Header: "LANE ID", accessor: "LANE_ID", align: "center" },
                      { Header: "VEHICLE NO", accessor: "VEH_PLATE", align: "center" },
                      { Header: "PASSAGE TIME", accessor: "PASSAGE_TIME", align: "center" },
                      {
                        Header: "VEHICLE CLASS",
                        accessor: "VEH_CLASS_DESCRIPTION",
                        align: "center",
                      },
                      { Header: "PAYMENT", accessor: "PAY_DESCRIPTION", align: "center" },
                      { Header: "RE STATUS", accessor: "ABNORMALITY", align: "center" },
                      { Header: "ACTION", accessor: "ACTION", align: "center" },
                    ],
                    rows: tabledata,
                  }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
                <MDBox mt={2} display="flex" gap={1} justifyContent="flex-start">
                  <MDButton color="info" startIcon={<SkipPreviousIcon/>} onClick={()=>{if(page > 1) return setPage(page-1)}}>
                  Prev
                  </MDButton>
                  <MDButton>{page}</MDButton>
                  <MDButton color="info" onClick={()=>setPage(page+1)} endIcon={<SkipNextIcon/>}>Next</MDButton>
                </MDBox>
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Transaction_validate;
