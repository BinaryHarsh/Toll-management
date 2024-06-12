// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/istockphoto-513106144-612x612.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";

import { success ,error} from "../../../../components/Loader/alertmessage";


function Cover() {
  const [email,setEmail] = useState('');
  // const [error,setError] = useState({})
  const postemail=async()=>{
    try{
      const apiresponse = await callapi(apiurls.forgot_password,{},"POST",{email:email});
      console.log(apiresponse);
    }
    catch(error){
      error(error);
    }

  }
  const validate=()=>{
    let validate = true;
    
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    // if(pattern.test(email)){
    //   // postemail();
      
    // }
    // if(pattern.test(email) == false){

    //   error("Invalid Email Format");
    // }
    // if(!email){
      error("Email Can't Be Balnk ");
    // }
    // if(email != ""){
    //   error("Invalid Email Format");
    // }
    // return validate;
  }
  const handlepost=()=>{
    console.log("Hh");
    success("hjhj");
    error("hjhj");
    // if(validate()){
    //   success("Done");
    // }
  }

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="email"
               
               label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handlepost}>
                Reset
              </MDButton>
              <MDTypography display="block" textAlign="center" variant="h6"  color="info" my={1}>
            <Link to="/login">Login ?</Link>
          </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
