import { useState } from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Images
import { Box, FormControl, MenuItem, InputLabel, Select, TextField } from "@mui/material";
// import { DatePicker } from "rsuite";
import MDdatepicker from "components/RsuitDatepicker";
import { useSelector } from "react-redux";
import { masterData } from "../../../redux/slices/allmaster.slice";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { success, error } from "components/Loader/alertmessage";
function Transactionavc({ index, type, children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const master_data = useSelector((state)=>state?.master?.data?.data);
  console.log(master_data);
  const [tabledata, setTabledata] = useState([]);
  const [filter, setFilter] = useState({
    lane: "All",
    laneType: "All",
    paymentType: "All",
    plateNumber: "",
    tagId: "",
    vehicleClass: "All",
    transactionId: "",
    reportType: "PaymentType-Wise",
  });
  const handleChange = (e) => {
    setFilter((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const searchdata = async () => {
    try {
      let body = {
        ...filter,
        fromDate: filter.fromDate.toISOString(),
        toDate: filter.toDate.toISOString(),
      };
      const apiresponse = await callapi(apiurls.avc_report, {}, "POST", body);
      setTabledata(apiresponse?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generaterepo = async () => {
    try {
      let obj = {
        lane: filter.lane,
        laneType: filter.laneType,
        paymentType: filter.paymentType,
        plateNumber: filter.plateNumber,
        tagId: filter.tagId,
        vehicleClass: filter.vehicleClass,
        transactionId: filter.transactionId,
        loginUser: `${user?.first_name} ${user?.last_name}`,
        reportsId: [9],
        fromDate: new Date(filter.fromDate).toISOString(),
        toDate: new Date(filter.toDate).toISOString(),
      };
      const apiresponse = await callapi(apiurls.generatereport, {}, "POST", obj);
      if (apiresponse?.data) {
        success("AVC Report Generate SuccessFully");
      } else {
        error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
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
            value={filter.fromDate}
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
                value={filter.laneType ?? ""}
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
          <MDBox style={{ display: "flex", justifyContent: "space-between" }}>
            <MDButton
              variant="contained"
              onClick={generaterepo}
              color="success"
              endIcon={<Icon fontSize="medium">summarizeicon</Icon>}
            >
              Generate
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
          </MDBox>
        </MDBox>
      </Card>
      <MDBox mt={3}>
        <Card>
          {tabledata != undefined && tabledata.length > 0 && (
            <MDBox p={3}>
              <DataTable
                table={{
                  columns: [
                    { Header: "VEHICLE CLASS", accessor: "CLASS_DESCRIPTION", align: "left" },
                    { Header: "CARJEEPVAN", accessor: "CARJEEPVAN", align: "center" },
                    { Header: "LCVMINIBUS", accessor: "LCVMINIBUS", align: "center" },
                    { Header: "BUS2AXLES", accessor: "BUS2AXLES", align: "center" },
                    { Header: "TRUCK2AXLES", accessor: "TRUCK2AXLES", align: "center" },
                    { Header: "MAV3AXLES", accessor: "MAV3AXLES", align: "center" },
                    { Header: "MAV4to6AXLES", accessor: "MAV4to6AXLES", align: "center" },
                    { Header: "Oversized Vehicle", accessor: "Oversized_vehicle", align: "center" },
                    { Header: "Total ", accessor: "Total", align: "center" },
                    { Header: "Total %", accessor: "Percentage", align: "center" },
                  ],
                  rows: tabledata,
                }}
                isSorted={true}
                entriesPerPage={true}
                showTotalEntries={true}
              />
            </MDBox>
          )}
        </Card>
      </MDBox>
    </>
  );
}

// Setting default props for the Header
Transactionavc.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Transactionavc.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Transactionavc;
