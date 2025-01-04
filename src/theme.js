import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF4081",
      light: "#FF80AB",
      dark: "#F50057",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#2196F3",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 24px",
        },
        contained: {
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))",
        },
      },
    },
  },
});

export default theme;
