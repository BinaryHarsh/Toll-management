import { useState, useMemo, useEffect } from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Images
import { Box, FormControl, MenuItem, InputLabel, Select, TextField } from "@mui/material";
// import { DatePicker } from "rsuite";
import MDdatepicker from "components/RsuitDatepicker";
import { useDispatch, useSelector } from "react-redux";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";
import { report_list, report_detail_list } from "../../../redux/slices/report.slice";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { error, success } from "../../../components/Loader/alertmessage";
function Transactiondetail({ index, type, children }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const master_data = useSelector((state) => state?.master?.data.data);
  const [countobj, setCountobj] = useState({});
  const navigate = useNavigate();
  const [tabledata, setTabledata] = useState([]);
  const [filter, setFilter] = useState({});
  const handleClick = (e, i) => {
    navigate(`/transaction-report-details/${e.LANE_TRANS_ID}`);
    // const apiresponse = await callapi(`${apiurls.transactionbyid}/${e.LANE_TRANS_ID}`, {}, "GET");
  };
  const searchdata = async () => {
    try {
      const apiresponse = await callapi(`${apiurls.getreport}/${page}`, {}, "POST", filter);
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

  useMemo(() => {
    searchdata();
  }, [page]);

  const generaterepo = async () => {
    try {
      let obj = {
        ...filter,
        loginUser: `${user?.first_name} ${user?.last_name}`,
        reportsId: [1],
        fromDate: new Date(filter.fromDate).toISOString(),
        toDate: new Date(filter.toDate).toISOString(),
      };
      const apiresponse = await callapi(apiurls.generatereport, {}, "POST", obj);
      if (apiresponse?.data) {
        success("Detail Report Generate SuccessFully");
      } else {
        error("Something Went Wrong");
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
            gridTemplateColumns: "repeat(4, 1fr)",
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
                value={filter.vehicleClass ?? ""}
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
                value={filter.lane_type ?? ""}
                name="lane_type"
                onChange={handleChange}
                label="Lane type"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="EN">EN</MenuItem>
                <MenuItem value="EX">EX</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
                { Header: "VEHICLE CLASS", accessor: "VEH_CLASS_DESCRIPTION", align: "center" },
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
            <MDButton
              color="info"
              startIcon={<SkipPreviousIcon />}
              onClick={() => {
                if (page > 1) return setPage(page - 1);
              }}
            >
              Prev
            </MDButton>
            <MDButton>{page}</MDButton>
            <MDButton color="info" onClick={() => setPage(page + 1)} endIcon={<SkipNextIcon />}>
              Next
            </MDButton>
          </MDBox>
        </MDBox>
      )}
    </>
  );
}

// Setting default props for the Header
Transactiondetail.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Transactiondetail.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Transactiondetail;
