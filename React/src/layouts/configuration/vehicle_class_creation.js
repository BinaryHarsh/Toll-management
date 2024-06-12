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
import { Edituser } from "models/usermodel";
import { Deleteuser } from "models/usermodel";
import moment from "moment";
import  Vehiclemodel  from "models/vehicleclass";
function Vehicle_class_creation(props) {
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
      const apiresponse = await callapi(apiurls.vehicle_class, {}, "GET");
      if (
        apiresponse?.data?.data?.vehicleClass != undefined &&
        apiresponse?.data?.data?.vehicleClass.length != 0
      ) {
        let array = apiresponse?.data?.data?.vehicleClass.map((val, i) => {
          let obj = {
            ...val,
            ENCODED_DATE:(
              moment(val.ENCODED_DATE).format("DD-MM-YYYY hh:mm:ss a")
            ),
            CLASS_STATUS:
              val.CLASS_STATUS == true ? (
                <MDBadge color="success" badgeContent={"Active"} />
              ) : (
                <MDBadge color="error" badgeContent={"Suspended"} />
              ),
            ACTION: (
              <MDBox display="flex" gap="0.6rem">
                <MDButton
                  size="small"
                  color="success"
                  id={val.id}
                  key={i}
                  onClick={() => handleEdit(val, "edit")}
                  startIcon={<Icon>edit</Icon>}
                >
                  Edit
                </MDButton>
                <MDButton
                  color="error"
                  size="small"
                  id={val.id}
                  key={i}
                  onClick={() => handleEdit(val, "delete")}
                  startIcon={<Icon>delete</Icon>}
                >
                  Delete
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
                <MDTypography variant="h6">Vehicle Class Creation</MDTypography>
                <MDButton color="info" variant="gradient" startIcon={<Icon>person</Icon>} onClick={() => setCretaemodel(true)}>
                  Create New Vehicle Class
                </MDButton>
              </MDBox>
            </Card>
            {tabledata != undefined && tabledata.length > 0 && (
              <MDBox pt={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "CLASS NO", accessor: "CLASS_NO", align: "left", width: "5rem" },
                      { Header: "DESCRIPTION", accessor: "CLASS_DESCRIPTION", align: "center" },
                      { Header: "SELECTON KEY", accessor: "SEL_KEY", align: "center" },
                      { Header: "STATUS", accessor: "CLASS_STATUS", align: "center" },
                      { Header: "DATE", accessor: "ENCODED_DATE", align: "center" },
                      { Header: "ACTION", accessor: "ACTION", align: "center" },
                    ],
                    rows: tabledata,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={true}
                />
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
      {cretaemodel && <Vehiclemodel closeeditmodel={closemodel} type={"Create"} tittle={"Create Vehicle Class"} />}
      {editmodel && <Vehiclemodel closeeditmodel={closeeditmodel} data={modeldata} type={"Edit"} tittle={"Edit Vehicle Class"} />}
      {deletemodel && <Vehiclemodel closeeditmodel={closedeletemodel} data={modeldata} type={"Delete"} tittle={"Delete Vehicle Class"} />}
      <Footer />
    </DashboardLayout>
  );
}
export default memo(Vehicle_class_creation);
