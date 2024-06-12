import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Error404() {
    
  return (
    <MDBox
      display="flex"
      justifyContent="center"
      height="100vh"
      alignItems="center"
      bgColor="grey-900"
    >
      <MDBox bgcolor="secondary" p={2}>
        <MDBox alignItems="center" fullwidth textAlign="center" color="white" mt={6}>
          <h1>Oops!</h1>
          <h5>We Can't Fid That Page</h5>
        </MDBox>
        <MDBox p={4}>
          <img
            src="/media/auth/404-error-dark.png"
            style={{ width: "25rem", height: "25rem" }}
          />
        </MDBox>
        <MDBox display="flex" justifyContent="center">
        <Link to='/' >
            <MDButton color="info">
            Login
            </MDButton>
        </Link>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
