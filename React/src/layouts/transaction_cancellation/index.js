// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import { DatePicker } from "rsuite";
import MDdatepicker from "components/RsuitDatepicker";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

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

import { memo, useMemo, useState } from "react";
import {  Icon, Radio,FormLabel, Badge } from "@mui/material";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { error } from "components/Loader/alertmessage";
// import FormControlLabel from '@mui/material/FormControlLabel';

function Transaction_cancellation() {
  const [page,setPage] = useState(1)
  const dispatch = useDispatch();
  const loginuser = JSON.parse(localStorage.getItem('auth'))?.user ?? ''
  const master_data = useSelector((state)=>state?.master?.data?.data);
  const [tabledata, setTabledata] = useState([]);
  const [filter, setFilter] = useState({});
  const [ind,setInd] = useState();
  const [object,setObject] = useState({})
  const [apidata,setApidata] = useState([])
  const [selectedobj,setSelectedobj] = useState({});
  const handleradio=(event,val,index)=>{
    setSelectedobj(val);
    setInd(index);
  }
  
  const arraydata = ()=>{
   let array =  apidata.map((val, i) => {
      let obj = {
        ...val,
        ACTION:(
          <Radio
          checked={i == ind ? true : false}
          onClick={(e)=>handleradio(e,val,i)}
          />
        )
      };
      return obj;
    });
    setTabledata(array)
  }
  useMemo(()=>{
  arraydata();
  },[apidata,ind])

  const filterdata = async () => {
    try{
      const apiresponse = await callapi(`${apiurls.transaction_cancel}/${page}`, {}, "POST", filter);
    if (apiresponse?.data?.data?.data != undefined && apiresponse?.data?.data?.data.length != 0) {
      setObject({totalCount:apiresponse?.data?.data.totalCount,totalPages:apiresponse?.data?.data.totalPages})
      setApidata(apiresponse?.data?.data.data ?? [])
    }
    }catch(error){
      console.log(error);
    }
  };

  useMemo(()=>{filterdata();},[page])

  const handleChange = (e) => {
    setFilter((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const cancelTransaction=async()=>{
    try{

      if(filter.Comment == undefined || selectedobj.LANE_TRANS_ID == undefined || filter.fromDate == null || filter.toDate == null){
        error("Please Select Transaction , Comment , fromDate & toDate")
        return false
      }
      let body = {
        loginUser:loginuser.first_name + " " + loginuser.last_name,
        transactionId:selectedobj.LANE_TRANS_ID,
        comment:filter.Comment
      }
      const apiresponse = await callapi(apiurls.cancel_transaction,{},"PUT",body);
      console.log(apiresponse)
    }
    catch(error){
        console.log(error)
    }
  }
  
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
                      // style={{ width: "100%" }}
                      size="lg"
                      label="From :-"
                      // value={filter.from_date}
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
                      name="plate_num"
                      value={filter.plate_num}
                      onChange={handleChange}
                      // placeholder="Enter Plate Number Here "
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
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Tag Id"
                      name="tag_Id"
                      value={filter.tag_Id}
                      onChange={handleChange}
                      style={{ minHeight: "2.5rem" }}
                      // InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
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
                      // style={{ width: "100%" }}
                      size="lg"
                      // value={filter.toDate}
                      onChange={(val, e) => setFilter((value) => ({ ...value, ["toDate"]: val }))}
                      format="dd MMM yyyy hh:mm:ss"
                      showMeridian
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Transaction Id"
                      name="transaction_id"
                      value={filter.transaction_id}
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
                          Comment
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          value={filter.Comment ?? ""}
                          name="Comment"
                          onChange={handleChange}
                          label="Comment"
                        >
                          <MenuItem value="">Select Comment</MenuItem>
                          <MenuItem value="TEST RECEIPT">TEST RECEIPT</MenuItem>
                          <MenuItem value="TC MISTAKE">TC MISTAKE</MenuItem>
                          <MenuItem value="VEHICLE NUMBER MISTAKE">VEHICLE NUMBER MISTAKE</MenuItem>
                          <MenuItem value="WRONG VEHICLE CLASS">WRONG VEHICLE CLASS</MenuItem>
                          <MenuItem value="PRINTER ISSUE">PRINTER ISSUE</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={3} >
                    <MDBox display="flex" gap={2}>
                    <MDButton
                      variant="contained"
                      onClick={filterdata}
                      color="success"
                      endIcon={<FilterAltIcon />}
                    >
                      Search
                    </MDButton>
                    <MDButton
                      variant="contained"
                      onClick={cancelTransaction}
                      color="error"
                      endIcon={<Icon>cancel</Icon>}
                    >
                      Cancel Transaction
                    </MDButton>
                    </MDBox>
                  
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
            {tabledata != undefined && tabledata.length > 0 && (
              <MDBox pt={3}>
                <MDBox 
                 mb={2}
                 pl={1}
                //  sx={{maxWidth:"100%"}}
                 display="flex"
                 justifyContent="space-between"
                >
                  <MDTypography sx={{maxWidth:"30%"}}>Total Count : {object.totalCount}</MDTypography>
                  {selectedobj?.LANE_TRANS_ID &&
                  <MDBox 
                pl={2}
                pt={1}
                pb={1}
                pr={2}
                borderRadius="lg"
                coloredShadow="info"
                sx={{maxWidth:"70%"}}
                  >
                  <MDTypography >Lane Id : {selectedobj.LANE_TRANS_ID}</MDTypography>
                  </MDBox>
                  }
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
                      { Header: "PAYMENT TYPE", accessor: "PAY_DESCRIPTION", align: "center" },
                      // { Header: "PAYMENT SUB TYPE", accessor: "PAY_DESCRIPTION", align: "center" },
                      { Header: "ABNORMALITY", accessor: "ABNORMALITY", align: "center" },
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
export default memo(Transaction_cancellation);
