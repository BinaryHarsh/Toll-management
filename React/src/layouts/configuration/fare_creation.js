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
import { Icon, Badge, Dialog, TextField } from "@mui/material";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import MDBadge from "components/MDBadge";
import Faremodel from "models/faremodel";
// import { Editfare } from "models/faremodel";
function Fare_creation(props) {
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
  };
  const filterdata = async () => {
    try {
      const apiresponse = await callapi(apiurls.fare_creation, {}, "GET");
      if (apiresponse?.data?.data != undefined && apiresponse?.data?.data.length != 0) {
        let array = apiresponse?.data?.data.map((val, i) => {
          let obj = {
            ...val,
            STATUS:
              val.STATUS == true ? (
                <MDBadge color="success" badgeContent={"Active"} />
              ) : (
                <MDBadge color="error" badgeContent={"Suspended"} />
              ),
            ACTION: (
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
                <MDTypography variant="h6">Fare Creation</MDTypography>
                <MDButton
                  color="info"
                  variant="gradient"
                  startIcon={<Icon>person</Icon>}
                  onClick={() => setCretaemodel(!cretaemodel)}
                >
                  Create New fare
                </MDButton>
              </MDBox>
            </Card>
            {tabledata != undefined && tabledata.length > 0 && (
              <MDBox pt={2}>
                <DataTable
                  table={{
                    columns: [
                      {
                        Header: "PLAZA ENTRY",
                        accessor: "PLAZA_ENTRY",
                        align: "left",
                        width: "5rem",
                      },
                      { Header: "PLAZA EXIT", accessor: "PLAZA_EXIT", align: "center" },
                      { Header: "VEHICLE CLASS", accessor: "CLASS_DESCRIPTION", align: "center" },
                      { Header: "PAYMENT TYPE", accessor: "PAY_TYPE", align: "center" },
                      { Header: "PAYMENT SUB TYPE", accessor: "PAY_SUB_TYPE", align: "center" },
                      { Header: "TOLL FARE", accessor: "TOLL_FARE", align: "center" },
                      { Header: "STATUS", accessor: "STATUS", align: "center" },
                      { Header: "ACTIVE DATE", accessor: "ACTIVE_DATE", align: "center" },
                      { Header: "ENCODED DATE", accessor: "ENCODED_DATE", align: "center" },
                      { Header: "EDIT", accessor: "ACTION", align: "center" },
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
      {cretaemodel && <Faremodel closemodel={closemodel}  type={"Create"} tittle={"Create Fare"}  />}
      {editmodel && <Faremodel closemodel={closeeditmodel} data={modeldata} type={"Edit"} tittle={"Edit Fare"} />}
      <Footer />
    </DashboardLayout>
  );
}
export default memo(Fare_creation);
