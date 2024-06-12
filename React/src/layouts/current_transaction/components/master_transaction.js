import { useEffect, useState } from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Images
import DataTable from "examples/Tables/DataTable";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { error } from "components/Loader/alertmessage";
import { success } from "components/Loader/alertmessage";
import moment from "moment/moment";
function Mastertransaction({ index, type, children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tabledata, setTabledata] = useState([]);
  const fatchdata = async () => {
    try {
      const apiresponse = await callapi(apiurls.masterfile, {}, "GET");
      if (apiresponse?.data?.data) {
        success("Master file Generate Successfully");
        let array = apiresponse?.data.data.map((val, i) => {
          let obj = {
            ...val,
            ENTRY_PASSAGE_TIME:(
                moment(val.ENTRY_PASSAGE_TIME).format("DD-MM-YYYY h:mm a")
                // dateformat(val.ENTRY_PASSAGE_TIME)
            ),
            API_TRANS_STATUS: val.API_TRANS_STATUS == true ? "true" : "false",
          };
          return obj;
        });
        setTabledata(array);
      } else {
        error("Something went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fatchdata();
  }, []);

  return (
    <>
      <MDBox>
        <Card>
          {tabledata != undefined && tabledata.length > 0 && (
            <MDBox p={3}>
              <DataTable
                table={{
                  columns: [
                    { Header: "TRANSACTION ID", accessor: "LANE_TRANS_ID", align: "left" },
                    { Header: "LANE", accessor: "ENTRY_LANE_ID", align: "center" },
                    { Header: "FASTAG", accessor: "TAG", align: "center" },
                    { Header: "VEHICLE PLATE", accessor: "VEH_PLATE", align: "center" },
                    { Header: "VEHICLE CLASS", accessor: "ENTRY_AVC_CLASS", align: "center" },
                    { Header: "PASSAGE TIME", accessor: "ENTRY_PASSAGE_TIME", align: "center" },
                    { Header: "STATUS", accessor: "API_TRANS_STATUS", align: "center" },
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
Mastertransaction.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Mastertransaction.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Mastertransaction;
