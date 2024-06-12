// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";
import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";

const { borderRadius } = borders;
const { xxl } = boxShadows;
const { background } = colors;
const dialog = {
  styleOverrides: {
    paper: {
      backgroundColor: background.card,
      borderRadius: borderRadius.lg,
      boxShadow: xxl,
    },

    paperFullScreen: {
      borderRadius: 0,
    },
  },
};

export default dialog;
