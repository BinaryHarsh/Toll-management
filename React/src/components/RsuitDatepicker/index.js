import React, { forwardRef } from "react";
import { DatePicker } from "rsuite";
import { useMaterialUIController } from "context";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import styled from "styled-components";
import Customratepickerroot from "./Customratepickerroot";

const MDdatepicker = forwardRef(({ ...rest }, ref) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    <Customratepickerroot
      {...rest}
      ref={ref}
      data = {darkMode ? themeDark : theme}
      theme = {darkMode ? "dark" : "light"}
    />
  );
});

export default MDdatepicker;
