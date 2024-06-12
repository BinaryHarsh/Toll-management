import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import { Alert, Badge, FormControlLabel, FormLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { shiftschema } from "schema";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { success } from "components/Loader/alertmessage";
import { error } from "components/Loader/alertmessage";
import MDTypography from "components/MDTypography";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";

export const Createrole = ({ closemodel }) => {
  const masterdata = useSelector((state) => state.master?.data);
  const [payload, setPayload] = useState({
    role_name: "",
    modules: [],
  });

  const postData =async()=>{
    try {
      const apiresponse = await callapi(apiurls.createRoles,{},"POST",payload);
      if(apiresponse?.data?.status == "success"){
        success(`${payload.role_name} Created Successfully`)
        closemodel();
        window.location.href = "/roles";
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payload.role_name) {
      error("Role Name is Required");
    }
    if (payload.modules.length == 0) {
      error("Please Select At Least one Permission");
    }
    if (payload.modules.length > 0 && payload.role_name) {
      postData();
    }
  };
  const handleChange = (e, val) => {
    if (e.target.name == "modules") {
      let index = payload.modules.findIndex((obj) => obj.id == val.id);
      if (e.target.checked && index == -1) {
        payload.modules.push({module_id:val.id,permission:'RW'});
      }
      if (!e.target.checked && index > -1) {
        payload.modules.splice(index, 1);
      }
    }
    if (e.target.name == "role_name") {
      payload.role_name = e.target.value;
    }
    setPayload({ ...payload });
  };
  return (
    <Dialog open={closemodel} fullWidth={true} onClose={closemodel}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Role</DialogTitle>
        <DialogContent>
          <TextField
            required
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(e)}
            value={payload.role_name}
            name="role_name"
            label="Role Name"
            type="text"
            variant="outlined"
          />
          <MDBox sx={{ maxHeight: 200 }} mt={2}>
            <MDBox display="flex">
              <MDTypography style={{ marginRight: "12px" }}>Permissions</MDTypography>
              {payload.modules.length > 0 && (
                <Badge color="info" size="small" badgeContent={payload.modules.length}></Badge>
              )}
            </MDBox>
            <FormGroup>
              {masterdata?.data?.moduleMaster != undefined &&
                masterdata?.data?.moduleMaster.length != 0 &&
                masterdata?.data?.moduleMaster.map((val, i) => (
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        name="modules"
                        onChange={(e) => handleChange(e, val)}
                      />
                    }
                    labelPlacement="top"
                    label={val.module_name}
                  />
                ))}
            </FormGroup>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closemodel}>Cancel</MDButton>
          <MDButton color="info" size="small" endIcon={<Icon>send</Icon>} type="submit">Create</MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const Viewroles = (props) => {
  const { closeviewmodel, data, modules } = props;
  const masterdata = useSelector((state) => state.master?.data);
  return (
    <Dialog open={closeviewmodel} fullWidth={true} onClose={closeviewmodel}>
        <DialogTitle>View Permission</DialogTitle>
        <DialogContent>
          <TextField
            required
            fullWidth
            margin="dense"
            value={data.role_name}
            name="role_name"
            label="Role Name"
            type="text"
            variant="outlined"
          />
          {modules.length == 0 ? (
            <MDBox mt={2} >
              <Alert icon={<Icon>error</Icon>} severity="error">
              No Permissions
            </Alert>
            </MDBox>
          ) : (
            <MDBox sx={{ maxHeight: 200 }} mt={2}>
              <MDBox display="flex">
                <MDTypography style={{ marginRight: "12px" }}>Permissions</MDTypography>
              </MDBox>
              <FormGroup>
                {masterdata?.data?.moduleMaster != undefined &&
                  masterdata?.data?.moduleMaster.length != 0 &&
                  masterdata?.data?.moduleMaster.map((val, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Switch
                            color="primary"
                            name="modules"
                            checked={modules[i]?.module_id == val.id ? true : false}
                          />
                        }
                        labelPlacement="top"
                        label={val.module_name}
                      />
                    );
                  })}
              </FormGroup>
            </MDBox>
          )}
        </DialogContent>
    </Dialog>
  );
};

export const Editrole = (props) => {
  const {closeeditmodel , data , modules} = props;
  const masterdata = useSelector((state) => state.master?.data);
  const [payload, setPayload] = useState({role_name: data.role_name,modules: modules});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payload.role_name) {
      error("Role Name is Required");
    }
    if (payload.modules.length == 0) {
      error("Please Select At Least one Permission");
    }
    ;(async()=>{
      try {
        let body={
          id:data.id,
          role_name:payload.role_name,
          modules:payload.modules
        }
        const apiresponse = await callapi(`${apiurls.updateRoles}/${data.id}`,{},"PATCH",body)
        if(apiresponse.data.status == "success"){
          success(`${data.role_name} is Updated Successfully`);
          closeeditmodel();
          
        }
      } catch (error) {
        console.log(error)
      }
    })()
  };
  const handleChange = (e, val) => {
      
    if (e.target.name == "modules") {
      let index = payload.modules.findIndex((obj) => obj.module_id == val.id);
      if (e.target.checked && index == -1) {
        payload.modules.push({module_id:val.id,permission:'RW'});
      }
      if (!e.target.checked && index > -1) {
        payload.modules.splice(index, 1);
      }
    }
    if (e.target.name == "role_name") {
      payload.role_name = e.target.value;
    }
    setPayload({ ...payload });
  };
  return (
    <Dialog open={closeeditmodel} fullWidth={true} onClose={closeeditmodel}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Update Role</DialogTitle>
        <DialogContent>
          <TextField
            required
            fullWidth
            margin="dense"
            onChange={(e) => handleChange(e)}
            value={payload.role_name}
            name="role_name"
            label="Role Name"
            type="text"
            variant="outlined"
          />
          <MDBox sx={{ maxHeight: 200 }} mt={2}>
            <MDBox display="flex">
              <MDTypography style={{ marginRight: "12px" }}>Permissions</MDTypography>
              {payload.modules.length > 0 && (
                <Badge color="info" size="small" badgeContent={payload.modules.length}></Badge>
              )}
            </MDBox>
            <FormGroup>
              {masterdata?.data?.moduleMaster != undefined &&
                masterdata?.data?.moduleMaster.length != 0 &&
                masterdata?.data?.moduleMaster.map((val, i) => (
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        name="modules"
                        checked={payload.modules.some((obj) => obj.module_id == val.id)}
                        onChange={(e) => handleChange(e, val)}
                      />
                    }
                    labelPlacement="top"
                    label={val.module_name}
                  />
                ))}
            </FormGroup>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closeeditmodel}>Cancel</MDButton>
          <MDButton color="success" size="small" endIcon={<Icon>edit</Icon>} type="submit">Edit</MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export const Deleteroles = (props) => {
  const { closedeletemodel, data, modules } = props;
  const masterdata = useSelector((state) => state.master?.data);
  const handledelete=async()=>{
    try{
      const apiresponse = await callapi(`${apiurls.deleteRole}/${data.id}`,{},"DELETE",{})
      if(apiresponse?.data?.status == "success"){
        success("Role Deleted Successfully");
        closedeletemodel();
        window.location.href = "/roles";
      }
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <Dialog open={closedeletemodel} fullWidth={true} onClose={closedeletemodel}>
        <DialogTitle>Delete Permission</DialogTitle>
        <DialogContent>
          <TextField
            required
            fullWidth
            margin="dense"
            value={data.role_name}
            name="role_name"
            label="Role Name"
            type="text"
            variant="outlined"
          />
          {modules.length == 0 ? (
            <MDBox mt={2} >
              <Alert icon={<Icon>error</Icon>} severity="error">
              Are You Sure Want to Delete This Role
            </Alert>
            </MDBox>
          ) : (
            <MDBox sx={{ maxHeight: 200 }} mt={2}>
              <MDBox display="flex">
                <MDTypography style={{ marginRight: "12px" }}>Permissions</MDTypography>
              </MDBox>
              <FormGroup>
                {masterdata?.data?.moduleMaster != undefined &&
                  masterdata?.data?.moduleMaster.length != 0 &&
                  masterdata?.data?.moduleMaster.map((val, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Switch
                            color="primary"
                            name="modules"
                            checked={modules[i]?.module_id == val.id ? true : false}
                          />
                        }
                        labelPlacement="top"
                        label={val.module_name}
                      />
                    );
                  })}
              </FormGroup>
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
        <MDButton onClick={closedeletemodel}>Cancel</MDButton>
          <MDButton color="error" size="small" endIcon={<Icon>delete</Icon>} onClick={handledelete} type="submit">Delete</MDButton>
        </DialogActions>
    </Dialog>
  );
};

