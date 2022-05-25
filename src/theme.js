import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1500,
    },
  },
  palette: {
    primary: { main: "#2E7A91" },
    secondary: { main: "#BBBBBB" },
  },
  MuiCssBaseline: {
    "@global": {
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },
    },
  },
});

export default theme;
