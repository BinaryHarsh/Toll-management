import { useState, useMemo, useEffect } from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Images
import { Box, FormControl, MenuItem, InputLabel, Select, TextField } from "@mui/material";
// import { DatePicker } from "rsuite";
import MDdatepicker from "components/RsuitDatepicker";
import { useDispatch, useSelector } from "react-redux";
import { masterData } from "../../../redux/slices/allmaster.slice";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";
import { report_list, report_detail_list } from "../../../redux/slices/report.slice";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { error, success } from "../../../components/Loader/alertmessage";
import MDInput from "components/MDInput";
function Cashup_reports({ index, type, children }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('auth'));
  console.log(user);
  const master_data = useSelector((state)=>state?.master?.data.data);
  const [countobj, setCountobj] = useState({});
  const navigate = useNavigate();
  const [tabledata, setTabledata] = useState([]);
  const [filter, setFilter] = useState({});
  const handleClick = (e, i) => {
    navigate(`/transaction-report-details/${e.LANE_TRANS_ID}`);
    // const apiresponse = await callapi(`${apiurls.transactionbyid}/${e.LANE_TRANS_ID}`, {}, "GET");
  };

  const resetFilter=()=>{
    setFilter({
      from_date:null,collector:'',cashier:'',toDate:null,shift:'',report_type:'',vehicleClass:''
    })
  }
  const searchdata = async () => {
    try {
      let payload = {
        fromDate:new Date(filter.fromDate).toISOString(),
        toDate:new Date(filter.toDate).toISOString(),
        reportType:filter.report_type ?? '',
        shift:filter.shift ?? 'All',
        cashierID:filter.cashierID,
        collecterID:filter.collectorID,
      }
      const apiresponse = await callapi(`${apiurls.searchcashupReport}`, {}, "POST", payload);
      let data = apiresponse?.data?.data;
      setCountobj(apiresponse?.data);
      dispatch(report_detail_list(data));
      if (data != undefined && data.length != 0) {
        success("List generate Successfully ");
        let array = data.map((val, i) => {
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
                  endIcon={<Icon>visibility</Icon>}
                >
                  View
                </MDButton>
              </MDBox>
            ),
          };
          return obj;
        });
        setTabledata(array);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generaterepo = async () => {
    try {
      if(filter.fromDate == null || filter.toDate == null){
        error("Please Select Any Date ");
        return false
      }
      let obj = {
        fromDate: new Date(filter.fromDate).toISOString(),
        toDate: new Date(filter.toDate).toISOString(),
        loginUser: `${user?.user?.first_name} ${user?.user?.last_name}`,
        collecterID : filter.collectorID,
        reportsId :[10],
        shift :filter.shift ?? 'All',
        cashierID : filter.cashierID,
      };
      const apiresponse = await callapi(`${apiurls.generatereport}`, {}, "POST", obj);
      if(apiresponse.data){
        success("Report Generate Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFilter((val) => ({ ...val, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Card>
        <MDBox
          py={3}
          px={2}
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <MDdatepicker
            ranges={[{ label: "today", value: new Date(), placement: "bottom" }]}
            // style={{ width: "100%" }}
            size="lg"
            label="From :-"
            value={filter.from_date}
            onChange={(val, e) => setFilter((value) => ({ ...value, ["fromDate"]: val }))}
            format="dd MMM yyyy hh:mm:ss"
            showMeridian
          />
         
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ height: "-webkit-fill-available" }}
              >
                Collector
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minHeight: "2.5rem" }}
                name="collector"
                value={filter.collector ?? ""}
                onChange={handleChange}
                label="collector"
              >
                <MenuItem value="All">All</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ height: "-webkit-fill-available" }}
              >
                Cashier
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minHeight: "2.5rem" }}
                value={filter.cashier ?? ""}
                name="cashier"
                onChange={handleChange}
                label="cashier"
              >
                <MenuItem value="All">All</MenuItem>
                
              </Select>
            </FormControl>
          </Box>
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
            value={filter.toDate}
            onChange={(val, e) => setFilter((value) => ({ ...value, ["toDate"]: val }))}
            format="dd MMM yyyy hh:mm:ss"
            showMeridian
          />
          
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ height: "-webkit-fill-available" }}
              >
                Shift
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minHeight: "2.5rem" }}
                value={filter.shift ?? ""}
                onChange={handleChange}
                name="shift"
                label="shift"
              >
                <MenuItem value="All">All</MenuItem>
                {master_data?.shiftMaster != undefined &&
                  master_data?.shiftMaster.map((val, i) => (
                    <MenuItem key={i} value={val.shift_name}>
                      {val.shift_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ height: "-webkit-fill-available" }}
              >
                Report Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minHeight: "2.5rem" }}
                value={filter.report_type ?? ""}
                name="report_type"
                onChange={handleChange}
                label="report_type"
              >
                <MenuItem value="Shift-Collection-Report">Shift Collection Report</MenuItem>
                <MenuItem value="Short-Excess-Report">Short Excess Report</MenuItem>
                <MenuItem value="Before-Cash-Up">Before Cash Up</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {filter.report_type == "Before-Cash-Up" && 
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
          
          }
          
          <MDBox style={{ display: "flex", justifyContent: "space-between" }}>
            <MDButton
              variant="contained"
              onClick={generaterepo}
              color="info"
              endIcon={<Icon fontSize="medium">summarizeicon</Icon>}
            >
              Generate report
            </MDButton>
            <MDButton
              variant="contained"
              //   onClick={filterdata}
              onClick={searchdata}
              color="success"
              endIcon={<Icon fontSize="medium">search</Icon>}
            >
              Search
            </MDButton>
            <MDButton
              variant="contained"
              onClick={resetFilter}
              color="error"
              endIcon={<Icon fontSize="medium">search</Icon>}
            >
              Reset
            </MDButton>
          </MDBox>
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
                { Header: "CASHUP ID", accessor: "LANE_TRANS_ID", align: "left" },
                { Header: "SHIFT", accessor: "LANE_ID", align: "center" },
                { Header: "CASHUP DATE", accessor: "VEH_PLATE", align: "center" },
                { Header: "TC NAME", accessor: "PASSAGE_TIME", align: "center" },
                { Header: "CASHUP AMOUNT", accessor: "VEH_CLASS_DESCRIPTION", align: "center" },
                { Header: "SYSTEM AMOUNT", accessor: "PAY_DESCRIPTION", align: "center" },
                { Header: "DIFFERENCE", accessor: "ABNORMALITY", align: "center" },
                { Header: "REMARK", accessor: "ACTION", align: "center" },
              ],
              rows: tabledata,
            }}
            isSorted={true}
            entriesPerPage={true}
            showTotalEntries={true}
          />
        </MDBox>
      )}
    </>
  );
}

// Setting default props for the Header
Cashup_reports.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Cashup_reports.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Cashup_reports;
