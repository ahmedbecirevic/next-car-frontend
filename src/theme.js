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
    primary: { main: "#00bfff" },
    secondary: { main: "#38c7b6" },
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
