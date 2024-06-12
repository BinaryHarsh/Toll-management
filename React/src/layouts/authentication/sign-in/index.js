import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate, useNavigation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Icon } from "@mui/material";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/istockphoto-1082720986-612x612.jpg";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { TextField } from "@mui/material";
import MDSnackbar from "components/MDSnackbar";
import { success } from "components/Loader/alertmessage";
import { sessionapi } from "config/axiosUtil";
import { useFormik } from "formik";
import { signupschema } from "schema";
import { useTable } from "react-table";

function Basic() {
  const [error, setError] = useState({});
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [initialvalues,setInitialvalues] = useState({
    amit:'',
    india:''
  })
  const handleSetRememberMe = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked == false) {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  };
  const {values,errors,touched,handleSubmit,handleChange,handleBlur}=useFormik({
    initialValues:initialvalues,
    validationSchema:signupschema,
    onSubmit:(values)=>{
      handleClick();
    } 
  })

  const handleClick = async () => {
    let url = `${process.env.REACT_APP_API_URL}${apiurls.login}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body:JSON.stringify({
        username: values.amit,
        password: values.india,
      }),
    };
    const apiresponse = await fetch(url, options).then((result) => {
      return result.json();
    });
    if(apiresponse?.data){
      let auth={
        errors:{},
        isAuthenticated:true,
        permission:apiresponse.data.user,
        user:apiresponse.data.user,
        token:apiresponse.data.tokens.access.token
      }
      localStorage.setItem('auth',JSON.stringify(auth))
      localStorage.setItem('id_token',JSON.stringify(apiresponse.data.tokens.access.token))
      const val = await sessionapi();
      if(val){
        navigate('/dashboard');
        success("Login Successfully ");
      }
    }
    if (rememberMe) {
      localStorage.username = values.amit;
      localStorage.password = values.india;
    }
  };

  useEffect(() => {
    if (rememberMe && localStorage.username !== "") {
      // setInitialvalues({
      //   amit:localStorage.username,
      //   india:localStorage.password
      // })
      values.amit=localStorage.username,
      values.india=localStorage.password
    }
  }, []);
  // console.log(values);

  // const validate = () => {
  //   let validate = true;
  //   let error = {};
  //   if (!login?.username) {
  //     validate = false;
  //     error.username = "Please Enter Username";
  //   }
  //   if (!login?.password) {
  //     validate = false;
  //     error.password = "Please Enter Password";
  //   }
  //   setError(error);
  //   return validate;
  // };
  // const handlePost = () => {
  //   if (validate()) {
      
  //   }
  // };

  // const handleChange = (e) => {
  //   if (e.target.name == "username") {
  //     error.username = undefined;
  //   }
  //   if (e.target.name == "password") {
  //     error.password = undefined;
  //   }
  //   setLogin((val) => ({ ...val, [e.target.name]: e.target.value }));
  // };
  return (
    <BasicLayout image={bgImage}> 
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <TextField
                error={errors.amit && touched.amit ? true : false}
                fullWidth
                type="username"
                id="outlined-error"
                label="Username"
                name="amit"
                value={values.amit}
                helperText={errors.amit && touched.amit ? errors.amit : ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </MDBox>
            <MDBox mb={2}>
            <FormControl sx={{width:"100%"}}  variant="outlined">
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
                name="india"
                error={errors.india && touched.india ? true : false}
                helperText={errors.india && touched.india ? errors.india : ""}
                value={values.india}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormControl>
            </MDBox>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" ml={-1}>
              <MDBox>
                <Switch
                  checked={rememberMe == true ? true : false}
                  onChange={handleSetRememberMe}
                />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>
              <MDTypography
                component={Link}
                to="/password-reset"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Forgot Password ?
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" type="submit" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
