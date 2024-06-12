import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Alert } from "@mui/material";
import { success } from "components/Loader/alertmessage";
import { vechiclecreteschema } from "schema";
import PropTypes from "prop-types";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
const Vehiclemodel = ({ closeeditmodel, data, tittle, type }) => {
  const isEdit = type === "Edit" || type === "Create" ? true : false;
  const initialValues = {
    vehicle_class: data?.CLASS_NO,
    selection_key: data?.SEL_KEY,
    description: data?.CLASS_DESCRIPTION,
    allow_speed: data?.ALLOWED_SPEED,
    anpr_class: data?.ANPR_CLASS,
    image_url: data?.IMAGE,
    tag_class: data?.TAG_CLASS,
    status: data?.CLASS_STATUS,
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,

    validationSchema: isEdit == true ? vechiclecreteschema :  "",
    onSubmit: (values) => {
      ;(async()=>{
          if(type === "Create"){
            try{
              let payload = {
                description: values.description,
                vehicleClass: Number(values.vehicle_class),
                selectionKey: values.selection_key,
                allowedSpeed: values.allow_speed,
                anprClass: values.anpr_class,
                imageUrl: values.image_url,
                tagClass: values.tag_class,
              };
              const apiresponse = await callapi(apiurls.vehicleCreate,{},"POST",payload)
              console.log(apiresponse);
            }
            catch(error){
              console.log(error)
            }}
            if(type === "Edit"){
              try{
                let payload = {
                  description: values.description,
                  selectionKey: values.selection_key,
                  allowedSpeed: values.allow_speed,
                  anprClass: values.anpr_class,
                  imageUrl: values.image_url,
                  tagClass: values.tag_class,
                  classStatus: true,
                };
                const apiresponse = await callapi(`${apiurls.vehicleUpdate}/${data.CLASS_NO}`,{},"POST",payload)
                if(apiresponse?.data?.status == "successfully update vehicle"){
                  success("Update Successfully");
                  closeeditmodel();
                  window.location.href = "/vehicle-class-creation"
                }
              }
              catch(error){
                console.log(error)
              }}
      })()}
  });

  return (
    <Dialog open={closeeditmodel} onClose={closeeditmodel}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{tittle}</DialogTitle>
        <DialogContent>
          {isEdit == true ? (
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
                error={errors.vehicle_class && touched.vehicle_class ? true : false}
                helperText={
                  errors.vehicle_class && touched.vehicle_class ? errors.vehicle_class : ""
                }
                value={values.vehicle_class}
                onChange={handleChange}
                onBlur={handleBlur}
                name="vehicle_class"
                label="Vehicle Class"
                type="text"
                variant="outlined"
              />
               <MDBox sx={{ minWidth: 150 ,marginTop:'0.5rem'}}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ height: "-webkit-fill-available" }}
                >
                  Selection Key
                </InputLabel>
                <Select
                margin="dense"
                    required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ minHeight: "2.75rem" }}
                  name="selection_key"
                  label="Selection Key"
                  error={errors.selection_key && touched.selection_key ? true : false}
                helperText={
                  errors.selection_key && touched.selection_key ? errors.selection_key : ""
                }
                value={values.selection_key}
                onChange={handleChange}
                onBlur={handleBlur}
                >
                  {["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"].map((val,i)=>
                  <MenuItem key={i} value={val}>
                  {val}
                </MenuItem>
                  )}
                  {/* <MenuItem value={""}>--Select--</MenuItem> */}
                  {/* {masterdata?.roleMaster != undefined &&
                    masterdata?.roleMaster.length != 0 &&
                    masterdata.roleMaster.map((val, i) => (
                      <MenuItem key={i} value={val.id}>
                        {val.role_name}
                      </MenuItem>
                    ))} */}
                </Select>
              </FormControl>
               </MDBox>
              {/* <TextField
                required
                margin="dense"
                name="selection_key"
                error={errors.selection_key && touched.selection_key ? true : false}
                helperText={
                  errors.selection_key && touched.selection_key ? errors.selection_key : ""
                }
                value={values.selection_key}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Selection Key"
                type="select"
                variant="outlined"
              /> */}
              <TextField
                required
                margin="dense"
                name="description"
                label="Description"
                type="text"
                error={errors.description && touched.description ? true : false}
                helperText={errors.description && touched.description ? errors.description : ""}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                name="allow_speed"
                error={errors.allow_speed && touched.allow_speed ? true : false}
                helperText={errors.allow_speed && touched.allow_speed ? errors.allow_speed : ""}
                value={values.allow_speed}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Allow Speed"
                type="text"
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                error={errors.anpr_class && touched.anpr_class ? true : false}
                helperText={errors.anpr_class && touched.anpr_class ? errors.anpr_class : ""}
                value={values.anpr_class}
                onBlur={handleBlur}
                onChange={handleChange}
                name="anpr_class"
                label="Anpr Class"
                type="text"
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                error={errors.image_url && touched.image_url ? true : false}
                helperText={errors.image_url && touched.image_url ? errors.image_url : ""}
                value={values.image_url}
                onBlur={handleBlur}
                onChange={handleChange}
                name="image_url"
                label="Image Url"
                type="text"
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                error={errors.tag_class && touched.tag_class ? true : false}
                helperText={errors.tag_class && touched.tag_class ? errors.tag_class : ""}
                value={values.tag_class}
                onBlur={handleBlur}
                onChange={handleChange}
                name="tag_class"
                label="Tag Class"
                type="text"
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                error={errors.status && touched.status ? true : false}
                helperText={errors.status && touched.status ? errors.status : ""}
                value={values.status}
                onBlur={handleBlur}
                onChange={handleChange}
                name="status"
                label="Status"
                type="text"
                variant="outlined"
              />
            </MDBox>
          ) : (
            <MDBox>
              <Alert color="error">
                Are You Sure Want To Delete <strong>{data?.CLASS_DESCRIPTION}</strong>
              </Alert>
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closeeditmodel}>Cancel</MDButton>
          <MDButton color="success" size="small"  type="submit">
            {type}
          </MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

Vehiclemodel.proptypes = {
  data: PropTypes.shape({
    vehicle_class: PropTypes.number.isRequired,
    selection_key: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    allow_speed: PropTypes.string.isRequired,
    anpr_class: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    tag_class: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

Vehiclemodel.defaultprops = {
  data: {
    vehicle_class: "",
    selection_key: "",
    description: "",
    allow_speed: "",
    anpr_class: "",
    image_url: "",
    tag_class: "",
    status: "",
  },
};

export default Vehiclemodel;