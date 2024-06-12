import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import {shiftschema } from "schema";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Alert, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { success } from "components/Loader/alertmessage";
import { DatePicker } from "rsuite";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
export const Createshiftmodel = ({ closemodel }) => {
  const masterdata = useSelector((state) => state.master?.data);
  const initialValues = {
    shift_name: "",
    start_time: "",
    end_time: "",
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: shiftschema,
    onSubmit: (values) => {
      ;(async()=>{
        try{
          let payload = {
                shift_name: values.shift_name,
                shift_start_time: values.start_time,
                shift_end_time: values.end_time,
          }
          const apiresponse = await callapi(apiurls.createShift,{},"POST",payload)
          if(apiresponse?.data?.status == "success"){
            success("Shift Create Successfully");
            closemodel();
            window.location.href = "/shifts";
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
        <DialogTitle>Create New Shift</DialogTitle>
        <DialogContent>
            <TextField
              required
              fullWidth
              margin="dense"
              error={errors.shift_name && touched.shift_name ? true : false}
              helperText={errors.shift_name && touched.shift_name ? errors.shift_name : ""}
              value={values.shift_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="shift_name"
              label="Shift Name"
              type="text"
              variant="outlined"
            />
          <MDBox
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(2 , 1fr)",
            }}
          >
            <TextField
              required
              margin="dense"
              error={errors.start_time && touched.start_time ? true : false}
              helperText={errors.start_time && touched.start_time ? errors.start_time : ""}
              value={values.start_time}
              onChange={handleChange}
              onBlur={handleBlur}
              name="start_time"
              label="Start Name"
              type="text"
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              error={errors.end_time && touched.end_time ? true : false}
              helperText={errors.end_time && touched.end_time ? errors.end_time : ""}
              value={values.end_time}
              onChange={handleChange}
              onBlur={handleBlur}
              name="end_time"
              label="End Name"
              type="text"
              variant="outlined"
            /> 
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closemodel}>Cancel</MDButton>
          <MDButton color="info" size="small" endIcon={<Icon>send</Icon>} type="submit">
            Create
          </MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const Editshiftmodel = (props) => {
    const {closeeditmodel,data} = props
    const initialValues = {
      shift_name:data?.shift_name,
      start_time:data?.shift_start_time,
      end_time:data?.shift_end_time,
    };
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: initialValues,
      
      validationSchema: shiftschema,
      onSubmit: (values) => {
        ;(async()=>{
          try {
            let body={
              created_at:new Date().toISOString(),
              updated_at:new Date().toISOString(),
              id:data.id,
              shift_name:values.shift_name,
              shift_start_time:values.start_time,
              shift_end_time:values.end_time,
            }
            
            const apiresponse = await callapi(`${apiurls.updateShift}/${data.id}`,{},"PATCH",body)
            if(apiresponse?.data?.status == "success"){
              success("Shift Edit Successfully");
              closeeditmodel();
              window.location.href = "/shifts";
            }
          } catch (error) {
            console.log(error);
          }
        })()
      },
    });
  
    return (
      <Dialog open={closeeditmodel} onClose={closeeditmodel}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Shift</DialogTitle>
          <DialogContent>
              <TextField
                required
                fullWidth
                margin="dense"
                error={errors.shift_name && touched.shift_name ? true : false}
                helperText={errors.shift_name && touched.shift_name ? errors.shift_name : ""}
                value={values.shift_name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="shift_name"
                label="Shift Name"
                type="text"
                variant="outlined"
              />
            <MDBox
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(2 , 1fr)",
              }}
            >
              <TextField
                required
                margin="dense"
                error={errors.start_time && touched.start_time ? true : false}
                helperText={errors.start_time && touched.start_time ? errors.start_time : ""}
                value={values.start_time}
                onChange={handleChange}
                onBlur={handleBlur}
                name="start_time"
                label="Start Name"
                type="text"
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                error={errors.end_time && touched.end_time ? true : false}
                helperText={errors.end_time && touched.end_time ? errors.end_time : ""}
                value={values.end_time}
                onChange={handleChange}
                onBlur={handleBlur}
                name="end_time"
                label="End Name"
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
export const Deleteshiftmodel = (props) => {
    const {closedeletemodel,data} = props
    const initialValues = {
      shift_name:data?.shift_name,
      start_time:data?.shift_start_time,
      end_time:data?.shift_end_time,
    };
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: initialValues,
      validationSchema: shiftschema,
      onSubmit: (values) => {
        ;(async()=>{
          try{
            const apiresponse = await callapi(`${apiurls.deleteShift}/${data.id}`,{},"DELETE",{})
            if(apiresponse?.data?.status == "success"){
              success("Shift Delete Successfully");
              closedeletemodel();
              window.location.href = "/shifts";
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
          <DialogTitle>Delete Shift</DialogTitle>

          <DialogContent>
          <MDBox mt={2} >
            
              <Alert icon={<Icon>error</Icon>} severity="error">
              Are You Sure Want to Delete This Shift
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