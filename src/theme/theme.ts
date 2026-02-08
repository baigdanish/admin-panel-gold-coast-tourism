import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd712", // <-- put your main color here
    },
    secondary: {
      main: "#ff4081", // <-- your secondary color
    },
  },

  typography: {
    fontFamily: "Poppins, Arial",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          borderRadius: 10,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
