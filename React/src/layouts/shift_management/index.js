// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { memo, useEffect, useState } from "react";
import { Icon, Badge, Dialog } from "@mui/material";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { Usermodel } from "models/usermodel";
import MDBadge from "components/MDBadge";
import { Createshiftmodel ,Editshiftmodel,Deleteshiftmodel} from "models/shiftmodel";
function Shift_management(props) {
  const [tabledata, setTabledata] = useState([]);
  const [cretaemodel, setCretaemodel] = useState(false);
  const [editmodel, setEditmodel] = useState(false);
  const [deletemodel, setDeletemodel] = useState(false);
  const [modeldata, setModeldata] = useState({});
  const closemodel = () => setCretaemodel(false);
  const closeeditmodel = () => setEditmodel(false);
  const closedeletemodel = () => setDeletemodel(false);

  const handleEdit = (e, val) => {
    if (val === "edit") {
      setEditmodel(true);
      setModeldata(e);
    }
    if(val === "delete"){
      setDeletemodel(true);
      setModeldata(e);
    }
  };


  const filterdata = async () => {
    try {
      const apiresponse = await callapi(apiurls.shifts, {}, "GET");
      console.log(apiresponse?.data?.data?.allShifts);
      let data = apiresponse?.data?.data?.allShifts;
      if (
        data != undefined &&
        data.length != 0
      ) {
        let array = data.map((val, i) => {
          let obj = {
            ...val,
            ACTION:(
              <MDBox display="flex" gap="0.6rem">
                <MDButton
                  color="success"
                  id={val.id}
                  key={i}
                  onClick={() => handleEdit(val, "edit")}
                >
                    <Icon>edit</Icon>
                </MDButton>
                <MDButton
                  color="error"
                  id={val.id}
                  key={i}
                  onClick={() => handleEdit(val, "delete")}
                >
                    <Icon>delete</Icon>
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
  useEffect(() => {
    filterdata();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox display="flex" justifyContent="space-between" p={2} alignItems="center">
                <MDTypography variant="h6">Shift Management</MDTypography>
                <MDButton color="info" variant="gradient" startIcon={<Icon>add</Icon>} onClick={() => setCretaemodel(true)}>
                  Create New Shift
                </MDButton>
              </MDBox>
            </Card>
            {tabledata != undefined && tabledata.length > 0 && (
              <MDBox pt={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "ID", accessor: "id", align: "left", width: "5rem" },
                      { Header: "SHIFT NAME", accessor: "shift_name", align: "center" },
                      { Header: "START TIME", accessor: "shift_start_time", align: "center" },
                      { Header: "END SHIFT", accessor: "shift_end_time", align: "center" },
                      { Header: "ACTION", accessor: "ACTION", align: "center" },
                    ],
                    rows: tabledata,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
      {cretaemodel && <Createshiftmodel closemodel={closemodel} />}
      {editmodel && <Editshiftmodel closeeditmodel={closeeditmodel} data={modeldata} />}
      {deletemodel && <Deleteshiftmodel closedeletemodel={closedeletemodel} data={modeldata} />}
      <Footer />
    </DashboardLayout>
  );
}
export default memo(Shift_management);
