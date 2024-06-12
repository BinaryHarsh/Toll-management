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
function Filetransaction({ index, type, children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tabledata, setTabledata] = useState([]);
  const fatchdata = async () => {
    try {
      const apiresponse = await callapi(apiurls.toll_files, {}, "GET");
      if (apiresponse?.data?.data) {
        success("Toll File Generate Successfully");
        let array = apiresponse?.data.data.map((val, i) => {
          let obj = {
            ...val,
            CREATIONTIME:(
                moment(val.CREATIONTIME).format("DD-MM-YYYY h:mm a")
                // dateformat(val.ENTRY_PASSAGE_TIME)
            ),
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
                    { Header: "FILE NAME", accessor: "FILENAME", align: "left" },
                    { Header: "FILE TYPE", accessor: "FILETYPE", align: "center" },
                    { Header: "TIME", accessor: "CREATIONTIME", align: "center" },
                    { Header: "RECORDS", accessor: "RECORDS", align: "center" },
                    { Header: "UPLOAD STATUS", accessor: "F_STATUS", align: "center" },
                  ],
                  rows: tabledata,
                }}
                isSorted={false}
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
Filetransaction.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Filetransaction.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Filetransaction;
