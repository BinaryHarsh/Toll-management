import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import { createUserschema } from "schema";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Alert, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { success } from "components/Loader/alertmessage";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
export const Usermodel = ({ closemodel }) => {
  const masterdata = useSelector((state) => state.master?.data?.data);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    mobile_number: "",
    shift_id:'',
    role_id: '',
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: createUserschema,
    onSubmit: (values) => {
      ;(async()=>{
        try{
          const apiresponse = await callapi(apiurls.usercreate,{},"POST",values)
          if(apiresponse?.data?.status == "success"){
            success("User Create Successfully")
            window.location.href = "/users";
          }
        }
        catch(error){
          console.log(error)
        }
      })()
    },
  });

  return (
    <Dialog open={closemodel} onClose={closemodel}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <MDBox
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <TextField
              required
              margin="dense"
              error={errors.first_name && touched.first_name ? true : false}
              helperText={errors.first_name && touched.first_name ? errors.first_name : ""}
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="first_name"
              label="First Name"
              type="text"
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              name="last_name"
              error={errors.last_name && touched.last_name ? true : false}
              helperText={errors.last_name && touched.last_name ? errors.last_name : ""}
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Last Name"
              type="text"
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              name="username"
              label="Username"
              type="text"
              error={errors.username && touched.username ? true : false}
              helperText={errors.username && touched.username ? errors.username : ""}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <FormControl  variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <Icon
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Icon>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                error={errors.password && touched.password ? true : false}
                helperText={errors.password && touched.password ? errors.password : ""}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ height: "-webkit-fill-available" }}
                  
                >
                  Role
                </InputLabel>
                <Select
                    required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ minHeight: "2.75rem" }}
                  name="role_id"
                  label="Role"
                  error={errors.role_id && touched.role_id ? true : false}
                  helperText={errors.role_id && touched.role_id ? errors.role_id : ""}
                  onBlur={handleBlur}
                  value={values.role_id}
                  onChange={handleChange}
                >
                  {/* <MenuItem value={""}>--Select--</MenuItem> */}
                  {masterdata?.roleMaster != undefined &&
                    masterdata?.roleMaster.length != 0 &&
                    masterdata.roleMaster.map((val, i) => (
                      <MenuItem key={i} value={val.id}>
                        {val.role_name}
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
                  Shift
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ minHeight: "2.75rem" }}
                  name="shift_id"
                  label="Shift"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shift_id}
                >
                  {masterdata?.shiftMaster != undefined &&
                    masterdata?.shiftMaster.length != 0 &&
                    masterdata.shiftMaster.map((val, i) => (
                      <MenuItem key={i} value={val.id}>
                        {val.shift_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              margin="dense"
              name="email"
              error={errors.email && touched.email ? true : false}
              helperText={errors.email && touched.email ? errors.email : ""}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Email"
              type="email"
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              error={errors.mobile_number && touched.mobile_number ? true : false}
              helperText={errors.mobile_number && touched.mobile_number ? errors.mobile_number : ""}
              value={values.mobile_number}
              onBlur={handleBlur}
              onChange={handleChange}
              name="mobile_number"
              label="Mobile Number"
              type="text"
              variant="outlined"
            />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closemodel}>Cancel</MDButton>
          <MDButton color="info" size="small"  endIcon={<Icon>send</Icon>} type="submit">
            Create
          </MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const Edituser = (props) => {
    const { closeeditmodel,data } = props;
    const masterdata = useSelector((state) => state.master?.data?.data);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const initialValues = {
      first_name:data?.first_name,
      last_name:data?.last_name,
      username:data?.admin_login?.username,
      password: data?.admin_login?.password,
      email: data?.email,
      mobile_number:(data?.mobile_number).trim(),
      shift_id:data?.shift_id,
      role_id:data?.role_id,
    };
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: initialValues,
      validationSchema: createUserschema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  
    return (
      <Dialog open={closeeditmodel} onClose={closeeditmodel}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <MDBox
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <TextField
                required
                margin="dense"
                error={errors.first_name && touched.first_name ? true : false}
                helperText={errors.first_name && touched.first_name ? errors.first_name : ""}
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="first_name"
                label="First Name"
                type="text"
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                name="last_name"
                error={errors.last_name && touched.last_name ? true : false}
                helperText={errors.last_name && touched.last_name ? errors.last_name : ""}
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Last Name"
                type="text"
                variant="outlined"
              />
  
              <TextField
                required
                margin="dense"
                name="username"
                label="Username"
                type="text"
                error={errors.username && touched.username ? true : false}
                helperText={errors.username && touched.username ? errors.username : ""}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
              />
              <FormControl sx={{}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <Icon
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Icon>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                  error={errors.password && touched.password ? true : false}
                  helperText={errors.password && touched.password ? errors.password : ""}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    Role
                  </InputLabel>
                  <Select
                      required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ minHeight: "2.75rem" }}
                    name="role_id"
                    label="Role"
                    error={errors.role_id && touched.role_id ? true : false}
                    helperText={errors.role_id && touched.role_id ? errors.role_id : ""}
                    onBlur={handleBlur}
                    value={values.role_id}
                    onChange={handleChange}
                  >
                    {/* <MenuItem value={""}>--Select--</MenuItem> */}
                    {masterdata?.roleMaster != undefined &&
                    masterdata?.roleMaster.length != 0 &&
                    masterdata.roleMaster.map((val, i) => (
                      <MenuItem key={i} value={val.id}>
                        {val.role_name}
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
                    Shift
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ minHeight: "2.75rem" }}
                    name="shift_id"
                    label="Shift"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shift_id}
                  >
                    {masterdata?.shiftMaster != undefined &&
                    masterdata?.shiftMaster.length != 0 &&
                    masterdata.shiftMaster.map((val, i) => (
                      <MenuItem key={i} value={val.id}>
                        {val.shift_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                margin="dense"
                name="email"
                error={errors.email && touched.email ? true : false}
                helperText={errors.email && touched.email ? errors.email : ""}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                type="email"
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                error={errors.mobile_number && touched.mobile_number ? true : false}
                helperText={errors.mobile_number && touched.mobile_number ? errors.mobile_number : ""}
                value={values.mobile_number}
                onBlur={handleBlur}
                onChange={handleChange}
                name="mobile_number"
                label="Mobile Number"
                type="text"
                variant="outlined"
              />
            </MDBox>
          </DialogContent>
          <DialogActions>
            <MDButton onClick={closeeditmodel}>Cancel</MDButton>
            <MDButton color="success" size="small" endIcon={<Icon>edit</Icon>} type="submit">
              Edit
            </MDButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  export const Deleteuser = (props) => {
    const { closedeletemodel,data } = props;
    const masterdata = useSelector((state) => state.master?.data);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const initialValues = {
      first_name:data?.first_name,
      last_name:data?.last_name,
      username:data?.admin_login?.username,
      password: data?.admin_login?.password,
      email: data?.email,
      mobile_number:(data?.mobile_number).trim(),
      shift_id:data?.shift_id,
      role_id:data?.role_id,
    };
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: initialValues,
      // validationSchema: createUserschema,
      onSubmit: (values) => {
        ;(async()=>{
          try{
            const apiresponse = await callapi(`${apiurls.deleteUser}/${data.id}`,{},"DELETE",{})
            if(apiresponse?.data?.status == "success"){
              success("User Delete Successfully");
              closedeletemodel();
              window.location.href = "/users";
            }
          }
          catch(error){
            console.log(error)
          }
        })()
      },
    });
  
    return (
      <Dialog open={closedeletemodel} onClose={closedeletemodel}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
          <MDBox mt={2} >
              <Alert icon={<Icon>error</Icon>} severity="error">
              Are You Sure Want to Delete This User
            </Alert>
            </MDBox>
          </DialogContent>
          <DialogActions>
            <MDButton onClick={closedeletemodel}>Cancel</MDButton>
            <MDButton color="error" size="small" endIcon={<Icon>delete</Icon>} type="submit">
              Delete 
            </MDButton>
          </DialogActions>
        </form>
        
      </Dialog>
    );
  };
