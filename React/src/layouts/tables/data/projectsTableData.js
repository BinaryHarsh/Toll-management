// @mui material components
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
export default function data(data = []) {
  console.log(data)
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );
  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  

  let tablearray  = [
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
    {LANE_TRANS_ID:"hello",LANE_ID:"Hkjhjh"},
  ]
  const array = data?.map((val,i)=>{
    return {
      LANE_TRANS_ID: val.LANE_TRANS_ID,
      LANE_ID:val.LANE_ID,
      };
  });
console.log((array))
console.log(tablearray)

  return {
    columns: [
      // { Header: "Harsh", accessor: "TXN ID", width: "30%", align: "left" },
      { Header: "TXN ID", accessor: "LANE_TRANS_ID", align: "left" },
      { Header: "LANE ID", accessor: "LANE_ID", align: "center" },
      // { Header: "VEHICLE NO", accessor: "VEH_PLATE", align: "center" },
      // { Header: "PASSAGE TIME", accessor: "PASSAGE_TIME", align: "center" },
      // { Header: "VEHICLE CLASS", accessor: "VEH_CLASS_DESCRIPTION", align: "center" },
      // { Header: "PAYMENT", accessor: "PAY_DESCRIPTION", align: "center" },
      // { Header: "RE STATUS", accessor: "RE STATUS", align: "center" },
      // { Header: "ACTION", accessor: "action", align: "center" },
    ],
    rows:array,
  };
}
