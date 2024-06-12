import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import DataTable from "examples/Tables/DataTable";
import { callapi } from "config/apiUtil";
import { apiurls } from "config/apiurls";
import { error } from "components/Loader/alertmessage";
import { success } from "components/Loader/alertmessage";
import "./cashup.css";
import {Divider,Grid,List,ListItem,ListItemText,MenuItem,Select,TextField,} from "@mui/material";
import MDTypography from "components/MDTypography";
import MDdatepicker from "components/RsuitDatepicker";
import MDButton from "components/MDButton";
import { blockinvalidkey } from "schema";
function Collector_cashup({ index, type, children }) {
  const user = JSON.parse(localStorage.getItem("auth"))?.user ?? '' ;
  const [tabledata, setTabledata] = useState([]);
  const [qty, setQty] = useState(0);
  const [finaltotal, setFinaltotal] = useState(0);
  const [otherdetails, setOtherdetails] = useState({});
  const [collection, setCollection] = useState({
    upi: 0,
    card: 0,
    dd: 0,
    rtgs: 0,
    wallet: 0,
    cheque: 0,
  });
  const [apidata, setApidata] = useState([]);
  const handleChange = (e, value, index) => {
    setApidata((prevApidata) =>
      prevApidata.map((obj, i) => {
        if (i === index) {
          if (e.target.name === "qty") {
            obj.qty = e.target.value;
            obj.amount = obj.DENOM_VALUE * e.target.value;
          }
        }
        return obj;
      })
    );
  };
  const arraydata = () => {
    let array = apidata.map((val, i) => {
      let obj = {
        ...val,
        mult: "*",
        qty: (
          <TextField
            InputProps={{
              className: "cashup-css",
              inputProps: {
                min: 0,
              },
            }}
            type="number"
            name="qty"
            onKeyDown={(e) => blockinvalidkey(e)}
            value={val.qty}
            onChange={(e) => handleChange(e, val, i)}
            sx={{ maxWidth: "5rem" }}
          />
        ),
        amount: (
          <TextField
            InputProps={{
              className: "cashup-css", // Add your desired class name
            }}
            value={val.amount}
            aria-readonly={true}
            name="amount"
            sx={{ maxWidth: "5rem" }}
          />
        ),
      };
      return obj;
    });
    setTabledata(array);
  };
  useMemo(() => {
    arraydata();
  }, [apidata, qty]);

  const fatchdata = async () => {
    try {
      const apiresponse = await callapi(apiurls.demonination, {}, "GET");
      if (apiresponse?.data?.data) {
        // success("Mid Shift Successfully");
        let array = apiresponse?.data?.data.map((val) => {
          let obj = {
            ...val,
            qty: 0,
            amount: 0,
          };
          return obj;
        });
        setApidata(array ?? []);
      } else {
        error("Something went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const subtotal = apidata.reduce((acc, val) => {
    return acc + val.amount;
  }, 0);

  useEffect(() => {
    fatchdata();
  }, []);

  const handlecollection = (e) => {
    setCollection((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const handleCalculate = () => {
    let total = Object.values(collection).reduce((acc, value) => {
      return acc + Number(value);
    }, 0);
    setFinaltotal(total + subtotal);
  };
  const domarray =()=>{
    let list = tabledata.map((val)=>{
      let obj ={
        DENOM_DATE:new Date(val.DENOM_DATE)?.toISOString(),
        DENOM_NO:val.DENOM_NO,
        DENOM_STATUS:val.DENOM_STATUS,
        DENOM_VALUE:val.DENOM_VALUE,
        quantity:val.qty.props.value,
        total:val.amount.props.value
      }
      return obj 
    })
    return list;
  }
  const handleSubmit = async(type) => {
    
    let payload = {
      time: otherdetails.date != undefined ? new Date(otherdetails.date).toISOString() : null ,
      denomination: domarray(),
      tcID: null,
      roleID: user.permissions.role_id,
      shift: otherdetails.shift,
      upi: collection.upi,
      card: collection.card,
      dd: collection.dd,
      rtgs: collection.rtgs,
      wallet: collection.wallet,
      cheque: collection.cheque,
      cashierID: user.id,
      cashupMethod: 'collectorCashup',
      total: finaltotal
    }
    try{
      if(type === "loadmid"){
        const apiresponse = await callapi(`${apiurls.loadmidCashup}/${otherdetails.selectedId}`,{},"GET")
        console.log(apiresponse);
      }
      if(type === "update"){
        const apiresponse = await callapi(`${apiurls.updateCollector}/${otherdetails.selectedId}`,{},"POST",payload)
        console.log(apiresponse);
      }
      if(type === "submit"){
        const apiresponse = await callapi(apiurls.submitCashup,{},"POST",payload)
       console.log(apiresponse);
      }
    }
    catch(error){
      console.log(error)
    }
  };
  
  const resetForm = () => {
    setQty(0);
    setFinaltotal(0);
    setCollection({ upi: 0, card: 0, dd: 0, rtgs: 0, wallet: 0, cheque: 0 });
    setApidata((apidata) =>
      apidata.map((val) => {
        return { ...val, ["qty"]: 0, ["amount"]: 0 };
      })
    );
  };
  return (
    
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card>
            <DataTable
              sx={{ width: "100%" }}
              table={{
                columns: [
                  { Header: "Demonination", accessor: "DENOM_VALUE", width: "1rem" },
                  { Header: "*", accessor: "mult", align: "center" },
                  { Header: "Quantity", accessor: "qty", align: "center" },
                  { Header: "Amount", accessor: "amount", align: "center" },
                ],
                rows: tabledata,
              }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
            />
            <MDBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MDBox display="flex" pr={5} justifyContent="space-between">
                    <MDTypography>SubTotal</MDTypography>
                    <MDTypography>{subtotal}</MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <MDBox px={4} py={3}>
              <List>
                <ListItem
                  secondaryAction={
                    <MDdatepicker
                      ranges={[
                        {
                          label: "today",
                          value: new Date(),
                          placement: "bottom",
                        },
                      ]}
                      size="md"
                      // label="Date :-"
                      onChange={(val, e) =>
                        setOtherdetails((value) => ({ ...value, ["date"]: val }))
                      }
                      format="dd MMM yyyy hh:mm:ss"
                      // showMeridian
                    />
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>Date</MDTypography>}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem
                  secondaryAction={
                    <Box sx={{ minWidth: 150, width: "12.1rem" }}>
                      <FormControl fullWidth>
                        <Select
                          style={{ minHeight: "2.5rem" }}
                          name="collector"
                          value={otherdetails.collector}
                          onChange={(e) =>
                            setOtherdetails((val) => ({ ...val, [e.target.name]: e.target.value }))
                          }
                        >
                          <MenuItem value="">No Data</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>Collector</MDTypography>}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem
                  secondaryAction={
                    <Box sx={{ minWidth: 150, width: "12.1rem" }}>
                      <FormControl fullWidth>
                        <Select
                          name="shift"
                          value={otherdetails.shift}
                          onChange={(e) =>
                            setOtherdetails((val) => ({ ...val, [e.target.name]: e.target.value }))
                          }
                          style={{ minHeight: "2.5rem" }}
                        >
                          <MenuItem value="Morning">Morning</MenuItem>
                          <MenuItem value="Evening">Evening</MenuItem>
                          <MenuItem value="Night">Night</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>Shift</MDTypography>}
                  />
                </ListItem>

                <Divider variant="middle" component="li" />
                <ListItem
                  secondaryAction={
                    <MDBox sx={{ width: "12.1rem" }}>
                      <TextField
                        InputProps={{
                          className: "cashup-css-right",
                          inputProps: {
                            min: 0,
                          },
                        }}
                        type="number"
                        name="upi"
                        value={collection.upi}
                        onChange={handlecollection}
                        onKeyDown={(e) => blockinvalidkey(e)}
                        fullWidth
                      />
                    </MDBox>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>UPI</MDTypography>}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem
                  secondaryAction={
                    <MDBox sx={{ width: "12.1rem" }}>
                      <TextField
                        InputProps={{
                          className: "cashup-css-right",
                          inputProps: {
                            min: 0,
                          },
                        }}
                        type="number"
                        name="card"
                        fullWidth
                        value={collection.card}
                        onChange={handlecollection}
                        onKeyDown={(e) => blockinvalidkey(e)}
                      />
                    </MDBox>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>Card</MDTypography>}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem
                  secondaryAction={
                    <MDBox sx={{ width: "12.1rem" }}>
                      <TextField
                        InputProps={{
                          className: "cashup-css-right",
                          inputProps: {
                            min: 0,
                          },
                        }}
                        type="number"
                        name="dd"
                        onKeyDown={(e) => blockinvalidkey(e)}
                        value={collection.dd}
                        onChange={handlecollection}
                        fullWidth
                      />
                    </MDBox>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>DD</MDTypography>}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem
                  secondaryAction={
                    <MDBox sx={{ width: "12.1rem" }}>
                      <TextField
                        InputProps={{
                          className: "cashup-css-right",
                          inputProps: {
                            min: 0,
                          },
                        }}
                        type="number"
                        name="rtgs"
                        onKeyDown={(e) => blockinvalidkey(e)}
                        value={collection.rtgs}
                        onChange={handlecollection}
                        fullWidth
                      />
                    </MDBox>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>RTGS</MDTypography>}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem
                  secondaryAction={
                    <MDBox sx={{ width: "12.1rem" }}>
                      <TextField
                        InputProps={{
                          className: "cashup-css-right",
                          inputProps: {
                            min: 0,
                          },
                        }}
                        type="number"
                        name="wallet"
                        onKeyDown={(e) => blockinvalidkey(e)}
                        value={collection.wallet}
                        onChange={handlecollection}
                        fullWidth
                      />
                    </MDBox>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>Wallet</MDTypography>}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem
                  secondaryAction={
                    <MDBox sx={{ width: "12.1rem" }}>
                      <TextField
                        fullWidth
                        InputProps={{
                          className: "cashup-css-right",
                          inputProps: {
                            min: 0,
                          },
                        }}
                        type="number"
                        name="cheque"
                        onKeyDown={(e) => blockinvalidkey(e)}
                        value={collection.cheque}
                        onChange={handlecollection}
                      />
                    </MDBox>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>Cheque</MDTypography>}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem secondaryAction={<MDTypography>{finaltotal}</MDTypography>}>
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1.2rem" }}>Total</MDTypography>}
                  />
                </ListItem>
              </List>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <MDBox p={2} display="grid" gap="1rem">
              <List>
                <ListItem
                  secondaryAction={
                    <Box sx={{ minWidth: 150, width: "12.1rem" }}>
                      <FormControl fullWidth>
                        <Select
                          name="selectedId"
                          value={otherdetails.selectedId}
                          onChange={(e) =>
                            setOtherdetails((val) => ({ ...val, [e.target.name]: e.target.value }))
                          }
                          style={{ minHeight: "2.5rem" }}
                        >
                          <MenuItem value=""></MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  }
                >
                  <ListItemText
                    secondary={<MDTypography sx={{ fontSize: "1rem" }}>Shift</MDTypography>}
                  />
                </ListItem>
              </List>

              <MDButton color="info" onClick={()=>handleSubmit("loadmid")} fullWidth>
                Load Mid Cashup
              </MDButton>
              <MDButton color="info" onClick={()=>handleSubmit("update")}  fullWidth>
                Update
              </MDButton>
              <MDButton color="info" fullWidth onClick={handleCalculate}>
                Calculate
              </MDButton>
              <MDButton color="success" onClick={()=>handleSubmit("submit")} fullWidth>
                Submit
              </MDButton>
              <MDButton color="warning" onClick={resetForm} fullWidth>
                Reset
              </MDButton>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    
  );
}
// Setting default props for the Header
Collector_cashup.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Collector_cashup.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Collector_cashup;
