// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { Fragment, memo } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import { useSelector } from "react-redux";
import MDButton from "components/MDButton";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Dialog, DialogTitle, Icon } from "@mui/material";
import { success } from "components/Loader/alertmessage";
function Transaction_details() {
  const user = JSON.parse(localStorage.getItem("auth"));
  const masterdata = useSelector((state) => state?.master?.data?.data);
  const transaaction_list = useSelector((state) => state.report_list.data);
  const data = useParams();
  const navigate = useNavigate();
  const [fullview, setFullview] = useState(false);
  const [errors,setErrors] = useState({})
  const [url,setUrl] = useState('/media/TollCarimg.jpg')
  const [filter, setFilter] = useState({
    VEH_PLATE:'',
    REVEH_CLASS_DESCRIPTION:'',
    PAY_DESCRIPTION:'',
    RE_VEH_FEE:null,
    PAYSUB_DESCRIPTION:'',
    WEIGHT:''
  });
  const [detaildata, setDetaildata] = useState({});
  const imgUrl = (time) => {
    const dateObject = new Date(time);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    let uri =  `http://103.158.148.19:3002/${year}/${month}/${day}/${data?.id}_F.jpg`
    setUrl(uri)
  };
  const handleClick = async (e) => {
    const apiresponse = await callapi(`${apiurls.transactionbyid}/${e}`, {}, "GET");
    let data = apiresponse?.data?.data?.transaction;
    imgUrl(data.PASSAGE_TIME)
    setFilter({
      VEH_PLATE: data.VEH_PLATE,
      REVEH_CLASS_DESCRIPTION: data.REVEH_CLASS_DESCRIPTION,
      PAY_DESCRIPTION:data.PAY_DESCRIPTION,
      RE_VEH_FEE:data.RE_VEH_FEE,
      PAYSUB_DESCRIPTION:data.PAYSUB_DESCRIPTION,
      WEIGHT:data.WEIGHT
    });
    setDetaildata(data);
  };

  // const handleChange=(e)=>{
  //   if(e.target.name == "VEH_PLATE"){
  //     errors.VEH_PLATE = undefined
  //   }
  //   if(e.target.name == "REVEH_CLASS_DESCRIPTION"){
  //     errors.REVEH_CLASS_DESCRIPTION = undefined
  //   }
  //   if(e.target.name == "PAY_DESCRIPTION"){
  //     errors.PAY_DESCRIPTION = undefined
  //   }
  //   if(e.target.name == "PAYSUB_DESCRIPTION"){
  //     errors.PAYSUB_DESCRIPTION = undefined
  //   }
  //   if(e.target.name == "WEIGHT"){
  //     errors.WEIGHT = undefined
  //   }
    
  //   setErrors(errors)
  //   setFilter((val)=>({...val,[e.target.name]:e.target.value}))
  // }
  const validate=(e)=>{
    let error = {};
    let validate=true;
    if(filter.VEH_PLATE == ''){
      error.VEH_PLATE = "Please Enter Vehicle Value";
      validate = false;
    }
    if(filter.REVEH_CLASS_DESCRIPTION == ''){
      error.REVEH_CLASS_DESCRIPTION = "Please Enter Vehicle Value";
      validate = false;
    }
    if(filter.PAY_DESCRIPTION == ''){
      error.PAY_DESCRIPTION = "Please Enter This Field";
      validate = false;
    }
    if(filter.PAYSUB_DESCRIPTION == ''){
      error.PAYSUB_DESCRIPTION = "Please Enter This Field";
      validate = false;
    }
    if(filter.WEIGHT == ''){
      error.WEIGHT = "Please Enter Weight";
      validate = false;
    }
    setErrors(error)
    return validate;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(validate()){
      success("all Done ")
    }
  }
  
  useEffect(() => {
    if (data?.id == undefined) {
      navigate("/dashboard");
    } else {
      handleClick(data?.id);
    }
  }, [data?.id, navigate]);

  const counter = (val) => {
    if (transaaction_list != undefined) {
      let index = transaaction_list.findIndex(
        (val) => val.LANE_TRANS_ID == detaildata.LANE_TRANS_ID
      );
      if (index > -1) {
        let obj = {};
        if (val == "prev") {
          obj = transaaction_list[index - 1];
        }
        if (val == "next") {
          obj = transaaction_list[index + 1];
        }
        navigate(`/transaction-report-details/${obj?.LANE_TRANS_ID ?? data?.id}`);
      }
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={4} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card id="delete-account">
              <MDBox
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="flex-start"
                shadow="xl"
                borderRadius="lg"
                p={3}
                mb={0}
                mt={2}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Transaction Id"
                      name="Transaction_Id"
                      value={detaildata?.LANE_TRANS_ID}
                      readOnly={true}
                      // value={filter.from_date}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Passage time"
                      readOnly={true}
                      name="Passage_Time"
                      value={detaildata.PASSAGE_TIME}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Payment Type"
                      name="Payment_Type"
                      value={detaildata.PAY_DESCRIPTION}
                      readOnly={true}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Payment Sub-Type"
                      name="Payment_Sub_Type"
                      value={detaildata.PAYSUB_DESCRIPTION}
                      readOnly={true}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Operator Class"
                      name="Operator_Class"
                      value={detaildata.REVEH_CLASS_DESCRIPTION}
                      readOnly={true}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Operator Plate"
                      name="Operator_Plate"
                      readOnly={true}
                      value={detaildata.VEH_PLATE}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Operator Comment"
                      name="Operator_Comment"
                      readOnly={true}
                      value={detaildata.RE_COMMENT}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="AVC Class"
                      name="AVC_Class"
                      readOnly={true}
                      value={detaildata.AVC_CLASS_DESCRIPTION}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="OP Fee"
                      name="OP_Fee"
                      readOnly={true}
                      value={detaildata.RE_VEH_FEE}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Operator Name"
                      name="Operator_Name"
                      readOnly={true}
                      value={detaildata.OPERATOR_ID}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Bar Code/S.Card"
                      name="Bar_Code/S.Card"
                      // value={detaildata.from_date}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Abnormal"
                      name="Abnormal"
                      readOnly={true}
                      value={detaildata.ABNORMALITY}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card id="delete-account">
              <MDBox
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="flex-start"
                shadow="xl"
                borderRadius="lg"
                p={3}
                pb={13}
                mb={0}
                mt={2}
              >
                  <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Reviewer"
                      name="Reviewer"
                      readOnly={true}
                      value={`${user?.user.first_name} ${user.user.last_name}`}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="RE Plate"
                      name="VEH_PLATE"
                      error={errors.VEH_PLATE  ? true: false}
                      helperText={errors.VEH_PLATE  ? errors.VEH_PLATE : ""}
                      value={filter.VEH_PLATE}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ height: "-webkit-fill-available" }}
                        >
                          Reviewer Class
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          value={filter.REVEH_CLASS_DESCRIPTION}
                          error={errors.REVEH_CLASS_DESCRIPTION  ? true: false}
                          helperText={errors.REVEH_CLASS_DESCRIPTION  ? errors.REVEH_CLASS_DESCRIPTION : ""}
                          name="REVEH_CLASS_DESCRIPTION"
                          // onChange={handleChange}
                          label="Reviewer_Class"
                        >
                          
                          {masterdata?.vehicleClass != undefined &&
                            masterdata?.vehicleClass.length != 0 &&
                            masterdata?.vehicleClass.map((val, i) => (
                              <MenuItem key={i} value={val.CLASS_DESCRIPTION}>
                                {val.CLASS_DESCRIPTION}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ height: "-webkit-fill-available" }}
                        >
                          Re Payment Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          error={errors.PAY_DESCRIPTION  ? true: false}
                          helperText={errors.PAY_DESCRIPTION  ? errors.PAY_DESCRIPTION : ""}
                          value={filter.PAY_DESCRIPTION}
                          name="PAY_DESCRIPTION"
                          // onChange={handleChange}
                          label="Re Payment Type"
                        >
                          {masterdata?.paymentTypeMaster != undefined &&
                            masterdata?.paymentTypeMaster.length != 0 &&
                            masterdata?.paymentTypeMaster.map((val, i) => (
                              <MenuItem key={i} value={val.DESCRIPTION}>
                                {val.DESCRIPTION}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ height: "-webkit-fill-available" }}
                        >
                          Re Payment Sub-Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          style={{ minHeight: "2.5rem" }}
                          error={errors.PAYSUB_DESCRIPTION  ? true: false}
                          helperText={errors.PAYSUB_DESCRIPTION  ? errors.PAYSUB_DESCRIPTION : ""}
                          value={filter.PAYSUB_DESCRIPTION}
                          name="PAYSUB_DESCRIPTION"
                          // onChange={handleChange}
                          label="Re Payment Sub Type"
                        >
                          {masterdata?.subPaymentTypeMaster != undefined &&
                            masterdata?.subPaymentTypeMaster.length != 0 &&
                            masterdata?.subPaymentTypeMaster.map((val, i) => (
                              <MenuItem key={i} value={val.DESCRIPTION}>
                                {val.DESCRIPTION}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Reviewer Fee"
                      name="Reviewer_Fee"
                      value={filter.RE_VEH_FEE}
                      readOnly={true}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Weight"
                      name="WEIGHT"
                      error={errors.WEIGHT  ? true: false}
                      helperText={errors.WEIGHT  ? errors.WEIGHT : ""}
                      value={filter.WEIGHT}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      type="text"
                      label="Re Comment"
                      name="Re_Comment"
                      value={filter.from_date}
                      // onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MDButton
                      color="warning"
                      disabled={transaaction_list ? false : true}
                      onClick={() => counter("prev")}
                    >
                      Previous
                    </MDButton>
                  </Grid>
                  {/* <Grid item xs={4}>
                    <MDButton color="success" type="submit">Validate</MDButton>
                  </Grid> */}
                  <Grid item xs={4}>
                    <MDButton
                      color="info"
                      disabled={transaaction_list ? false : true}
                      onClick={() => counter("next")}
                    >
                      Next
                    </MDButton>
                  </Grid>
                  
                </Grid>
                </form> 
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card id="delete-account">
              <MDBox
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="flex-start"
                shadow="xl"
                borderRadius="lg"
                p={3}
                mb={0}
                mt={2}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <img
                      src={url}
                      onClick={() => setFullview(!fullview)}
                      width={"100%"}
                      height={"70%"}
                    />
                    <Dialog
                      fullWidth={true}
                      maxWidth="xl"
                      open={fullview}
                      onClose={() => setFullview(!fullview)}
                    >
                      {/* <DialogContent> */}
                      <TransformWrapper
                        initialScale={1}
                        initialPositionX={100}
                        initialPositionY={100}
                      >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                          <Fragment>
                            <DialogTitle
                              className="tools"
                              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
                            >
                              <MDButton
                                circular={true}
                                color="info"
                                size="small"
                                onClick={() => zoomIn()}
                                startIcon={<Icon>add</Icon>}
                              >
                                Zoom in
                              </MDButton>
                              <MDButton
                                circular={true}
                                color="secondary"
                                size="small"
                                startIcon={<Icon>remove</Icon>}
                                onClick={() => zoomOut()}
                              >
                                Zoom out
                              </MDButton>
                              <MDButton
                                circular={true}
                                color="warning"
                                size="small"
                                onClick={() => resetTransform()}
                              >
                                reset
                              </MDButton>
                            </DialogTitle>
                            <TransformComponent>
                              <img src={url} alt="test" width={"100%"} height={"100%"} />
                            </TransformComponent>
                          </Fragment>
                        )}
                      </TransformWrapper>
                      {/* </DialogContent> */}
                    </Dialog>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default memo(Transaction_details);
