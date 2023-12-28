import { createTheme } from "@mui/material/styles";
const typo = {
 fontFamily: [
  "Roboto",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
 ].join(","),
 fontWeightLight: 300,
 fontWeightRegular: 400,
 fontWeightMedium: 500,
 fontWeightBold: 500,
};
export const Theme =
 window.localStorage.getItem("theme") === "dark"
  ? createTheme({
     palette: {
      mode: "dark",
      primary: {
       main: "#1ab06a",
       contrastText: "#ffffff",
      },
      background: {
       paper: "#1c1c1c",
      },
     },
     typography: typo,
    })
  : createTheme({
     palette: {
      mode: "light",
      primary: {
       main: "#1ab06a",
       contrastText: "#ffffff",
      },
      secondary: {
       main: "#ffffff",
      },
      background: {
       paper: "#ffffff",
       default: "#f5f5f5",
      },
     },
     typography: typo,
    });
