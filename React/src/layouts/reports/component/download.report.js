import { useState, useEffect } from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Images
import { useDispatch, useSelector } from "react-redux";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { download_report, report_download_list } from "../../../redux/slices/downloadreport.slice";
import moment from "moment";
function Downloadreport({ index ,type, children }) {
  const dispatch = useDispatch();
  const list_report = useSelector(report_download_list);
  const [tabledata, setTabledata] = useState(list_report);
  const handledownload=(val)=>{
    try{
      
      let downloadUrl = val?.download_url
      if (!downloadUrl) {
        console.error('Invalid download URL');
        return;
    }

    // Create a hidden anchor element
    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none';

    // Set the href and download attributes for the anchor element
    downloadLink.href = downloadUrl;
    downloadLink.download = 'report.csv'; // You can set the desired filename here

    // Append the anchor element to the document body
    document.body.appendChild(downloadLink);

    // Programmatically trigger a click event on the anchor element to initiate the download
    downloadLink.click();

    // Remove the anchor element from the document body after the download is initiated
    document.body.removeChild(downloadLink);
    }
    catch(error){
      console.log(error);
    }
  }
  const tablelist_data = async () => {
    try {
      dispatch(download_report());
       let array =  list_report != undefined && list_report.length != 0 && list_report.map((val,i)=>{
            let obj = {
                ...val,
                from:(
                  moment(val.from).format("DD-MM-YYYY hh:mm a")
                ),
                to:(
                  moment(val.to).format("DD-MM-YYYY hh:mm a")
                ),
                download_url:(
                    <MDBox variant="success" bgColor="success" borderRadius="lg" coloredShadow="success">
                        <MDButton
                        key={i}
                        startIcon={<Icon>download</Icon>}
                        onClick={()=>handledownload(val)}
                        >
                            Download
                        </MDButton>
                    </MDBox>
                )
            }
            return obj;
        })
      setTabledata(array);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    tablelist_data();
  },[dispatch]);

  return (
    <>
      <MDBox mt={3}>
        <Card>
          {tabledata != undefined && tabledata.length > 0 && (
            <MDBox p={3}>
              <DataTable
                table={{
                  columns: [
                    { Header: "Report Name", accessor: "report_name", align: "left" },
                    { Header: "From Date", accessor: "from", align: "center" },
                    { Header: "To Date", accessor: "to", align: "center" },
                    { Header: "Status", accessor: "status", align: "center" },
                    { Header: "Download", accessor: "download_url", align: "center" },
                  ],
                  rows: tabledata,
                }}
                isSorted={false}
                entriesPerPage={false}
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
Downloadreport.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Downloadreport.propTypes = {
  children: PropTypes.node,
  index:PropTypes.number.isRequired,
  type:PropTypes.string.isRequired,
};

export default Downloadreport;
