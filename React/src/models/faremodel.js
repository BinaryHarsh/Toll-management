import React, { useState } from "react";
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
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { success } from "components/Loader/alertmessage";
import MDdatepicker from "components/RsuitDatepicker";
import './picker.css';
import { fareschema } from "schema";
import moment from "moment";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
const Faremodel = ({ closemodel , data , type , tittle }) => {
  const masterdata = useSelector((state) => state.master?.data?.data);
  const [ACTIVE_DATE,setACTIVE_DATE] = useState(new Date(data?.ACTIVE_DATE ?? ''))
  const initialValues = {
    PLAZA_ENTRY: data?.PLAZA_ENTRY,
    PLAZA_EXIT: data?.PLAZA_EXIT,
    CLASS_DESCRIPTION: data?.VEH_CLASS,
    TOLL_FARE: data?.TOLL_FARE,
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: fareschema,
    onSubmit: (values) => {
      ;(async()=>{
       
        if(type === "Create"){
          try{
            const payload = {
              activeDate: ACTIVE_DATE,
              plazaEntry: values.PLAZA_ENTRY,
              plazaExit: values.PLAZA_EXIT,
              vehicleClass: values.CLASS_DESCRIPTION,
              overWightFare: 0,
              tollFare: values.TOLL_FARE
            };
            const apiresponse = await callapi(apiurls.fareCreate,{},"POST",payload)
            if(apiresponse?.data){
              closemodel();
              success(`${apiresponse?.data.status}`)
              window.location.href = "/fare-creation"
            }
          } 
          catch(error){
            console.log(error)
          }
        }
        if(type === "Edit"){
          try{
            const payload = {
              activeDate: ACTIVE_DATE,
              plazaEntry: values.PLAZA_ENTRY,
              plazaExit: values.PLAZA_EXIT,
              vehicleClass: values.CLASS_DESCRIPTION,
              overWightFare: 0,
              tollFare: Number(values.TOLL_FARE)
            };
            const apiresponse = await callapi(`${apiurls.fareEdit}/${data.FARE_ID}`,{},"PUT",payload)
            if(apiresponse?.data){
              closemodel();
              success(`${apiresponse?.data.status}`)
              window.location.href = "/fare-creation"
            }
          }
          catch(error){
            console.log(error)
          }

        }
      })()
    },
  });
  return (
    <Dialog open={closemodel} onClose={closemodel}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{tittle}</DialogTitle>
        <DialogContent>
        <MDdatepicker 
          
            ranges={[{
              label:'today',
              value:new Date(),
              placement:'bottom'
            }]}
            value={ACTIVE_DATE}
            size="lg"
            label="Active_date"
            name="ACTIVE_DATE"
            onChange={(val,e)=>setACTIVE_DATE(val)}
            format="dd MMM yyyy hh:mm:ss"
            showMeridian
            />
          <MDBox
          mt={2}
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <TextField
              required
              margin="dense"
              error={errors.PLAZA_ENTRY && touched.PLAZA_ENTRY ? true : false}
              helperText={errors.PLAZA_ENTRY && touched.PLAZA_ENTRY ? errors.PLAZA_ENTRY : ""}
              value={values.PLAZA_ENTRY}
              onChange={handleChange}
              onBlur={handleBlur}
              name="PLAZA_ENTRY"
              label="Plaza Entry"
              type="text"
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              name="PLAZA_EXIT"
              error={errors.PLAZA_EXIT && touched.PLAZA_EXIT ? true : false}
              helperText={errors.PLAZA_EXIT && touched.PLAZA_EXIT ? errors.PLAZA_EXIT : ""}
              value={values.PLAZA_EXIT}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Plaza Exit"
              type="text"
              variant="outlined"
            />
            <MDBox alignSelf="center" sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ height: "-webkit-fill-available" }}
                >
                  Vehicle Class
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ minHeight: "2.75rem" }}
                  name="CLASS_DESCRIPTION"
                  label="Vehicle Class"
                  error={errors.CLASS_DESCRIPTION && touched.CLASS_DESCRIPTION ? true : false}
                  helperText={
                    errors.CLASS_DESCRIPTION && touched.CLASS_DESCRIPTION
                      ? errors.CLASS_DESCRIPTION
                      : ""
                  }
                  onBlur={handleBlur}
                  value={values.CLASS_DESCRIPTION}
                  onChange={handleChange}
                >
                  {masterdata?.vehicleClass != undefined &&
                    masterdata?.vehicleClass.length != 0 &&
                    masterdata.vehicleClass.map((val, i) => (
                      <MenuItem key={i} value={val.CLASS_NO} >
                        {val.CLASS_DESCRIPTION}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </MDBox>
            <TextField
              margin="dense"
              name="TOLL_FARE"
              error={errors.TOLL_FARE && touched.TOLL_FARE ? true : false}
              helperText={errors.TOLL_FARE && touched.TOLL_FARE ? errors.TOLL_FARE : ""}
              value={values.TOLL_FARE}
              onChange={handleChange}
              onBlur={handleBlur}
              label="TOLL FARE"
              type="text"
              variant="outlined"
            />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closemodel}>Cancel</MDButton>
          <MDButton color="info" size="small" endIcon={<Icon>send</Icon>} type="submit">
            {type}
          </MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

Faremodel.prototypes = {
  data:PropTypes.shape({
    PLAZA_ENTRY:PropTypes.string.isRequired,
    PLAZA_EXIT:PropTypes.string.isRequired,
    CLASS_DESCRIPTION:PropTypes.string.isRequired,
    TOLL_FARE:PropTypes.string.isRequired,
    ACTIVE_DATE:PropTypes.string.isRequired
  })
}

Faremodel.defaultprops = {
  data:{
    PLAZA_ENTRY:'',
    PLAZA_EXIT:'',
    CLASS_DESCRIPTION:'',
    TOLL_FARE:'',
    ACTIVE_DATE:''
  }
}

export default Faremodel;
