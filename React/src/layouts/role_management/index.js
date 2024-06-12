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
import moment from "moment";
import { Createrole } from "models/rolesmodel";
import { Viewroles } from "models/rolesmodel";
import { Editrole } from "models/rolesmodel";
import { Deleteroles } from "models/rolesmodel";

function Role_management(props) {
  const [tabledata, setTabledata] = useState([]);
  const [cretaemodel, setCretaemodel] = useState(false);
  const [editmodel, setEditmodel] = useState(false);
  const [viewrole,setViewrole] = useState(false);
  const [deletemodel, setDeletemodel] = useState(false);
  const [modeldata, setModeldata] = useState({});
  const [modules,setModules] = useState([])
  const closemodel = () => setCretaemodel(false);
  
  const closeviewmodel = ()=>setViewrole(false);
  const closeeditmodel = () => setEditmodel(false);
  const closedeletemodel = () => setDeletemodel(false);

  const handleEdit = (e, val) => {
    if (val === "edit") {
      setEditmodel(true);
      setModules(e.modules)
      setModeldata(e);
    }
    if(val == "view"){
      setViewrole(true);
      setModules(e.modules)
      setModeldata(e);
    }
    if(val === "delete"){
      setDeletemodel(true);
      setModeldata(e);
    }
  };

 const filterdata = async () => {
    try {
      const apiresponse = await callapi(apiurls.roles, {}, "GET");
      if (
        apiresponse?.data?.data?.allroles != undefined &&
        apiresponse?.data?.data?.allroles.length != 0
      ) {
        let array = apiresponse?.data?.data?.allroles.map((val, i) => {
          let obj = {
            ...val,
            created_at:(moment(val.created_at).format("DD-MM-YYYY hh:mm:s A")),
            updated_at:(moment(val.updated_at).format("DD-MM-YYYY hh:mm:s A")),
            ACTION:(

              <MDBox display="flex" gap="0.6rem">
                <MDButton
                  size="small"
                  color="info"
                  id={val.id}
                  key={i}
                  onClick={() => handleEdit(val, "view")}
                  startIcon={<Icon>visibility</Icon>}
                >
                  View
                </MDButton>
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
                <MDTypography variant="h6">Role Management</MDTypography>
                <MDButton color="info" variant="gradient" startIcon={<Icon>person</Icon>} onClick={() => setCretaemodel(true)}>
                  Create New Role
                </MDButton>
              </MDBox>
            </Card>
            {tabledata != undefined && tabledata.length > 0 && (
              <MDBox pt={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "ROLE ID", accessor: "id", align: "left", width: "5rem" },
                      { Header: "ROLE NAME", accessor: "role_name", align: "center" },
                      { Header: "CREATED AT", accessor: "created_at", align: "center" },
                      { Header: "UPDATED AT", accessor: "updated_at", align: "center" },
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
      {cretaemodel && <Createrole  closemodel={closemodel}/>}
      {viewrole && <Viewroles closeviewmodel={closeviewmodel} data={modeldata} modules={modules}/>}
      {editmodel && <Editrole closeeditmodel={closeeditmodel} data={modeldata} modules={modules}/>}
      {deletemodel && <Deleteroles closedeletemodel={closedeletemodel} data={modeldata} modules={modules} />}
      <Footer />
    </DashboardLayout>
  );
}
export default memo(Role_management);
