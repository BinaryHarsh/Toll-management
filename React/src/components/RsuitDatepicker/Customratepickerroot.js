import React from "react";
import styled from "styled-components";
import { DatePicker } from "rsuite";

export default styled(DatePicker).attrs({ className: "custom-class" })(({ data }) => {
  const { palette } = data;
  let backgroundvalue = palette.transparent.main
  let textvalue = palette.picker.text
  return {
    width:"100%",
     '.rs-input-group.rs-input-group-lg.rs-input-group-inside,.rs-input,.rs-picker-label, .rs-input-group-addon': {
      background: backgroundvalue,
      color: textvalue,
    },
    '.rs-calendar':{
      background: backgroundvalue,
      color: textvalue,
    },
    '.rs-picker-toggle,.rs-calendar-year,.rs-calendar-month,.rs-calendar-header,.rs-datepicker':{
      background: backgroundvalue,
      color: textvalue,
    }
  };
});
