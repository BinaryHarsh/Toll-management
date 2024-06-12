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

function User_management(props) {
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
      const apiresponse = await callapi(apiurls.users, {}, "GET");
      if (
        apiresponse?.data?.data?.getusers != undefined &&
        apiresponse?.data?.data?.getusers.length != 0
      ) {
        let array = apiresponse?.data?.data?.getusers.map((val, i) => {
          let obj = {
            ...val,
            username: val.admin_login.username,
            is_active:
              val.admin_login.is_active == true ? (
                <MDBadge color="success" badgeContent={"Active"} />
              ) : (
                <MDBadge color="error" badgeContent={"Suspended"} />
              ),

            ACTION: i != 0 && i != 1 && (
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
                <MDTypography variant="h6">User Management</MDTypography>
                <MDButton color="info" variant="gradient" startIcon={<Icon>person</Icon>} onClick={() => setCretaemodel(true)}>
                  Create New
                </MDButton>
              </MDBox>
            </Card>
            {tabledata != undefined && tabledata.length > 0 && (
              <MDBox pt={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "ID", accessor: "id", align: "left", width: "5rem" },
                      { Header: "FIRST NAME", accessor: "first_name", align: "center" },
                      { Header: "LAST NAME", accessor: "last_name", align: "center" },
                      { Header: "MOBILE NUMBER", accessor: "mobile_number", align: "center" },
                      { Header: "USERNAME", accessor: "username", align: "center" },
                      // { Header: "ROLE", accessor: "mobile_number", align: "center" },
                      { Header: "STATUS", accessor: "is_active", align: "center" },
                      { Header: "ACTION", accessor: "ACTION", align: "center" },
                    ],
                    rows: tabledata,
                  }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                />
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
      {cretaemodel && <Usermodel closemodel={closemodel} />}
      {editmodel && <Edituser closeeditmodel={closeeditmodel} data={modeldata} />}
      {deletemodel && <Deleteuser closedeletemodel={closedeletemodel} data={modeldata} />}
      <Footer />
    </DashboardLayout>
  );
}
export default memo(User_management);
