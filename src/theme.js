import { createTheme } from "@mui/material/styles";

const getTheme = (mode) => createTheme({
  typography: {
    fontFamily: "'Ubuntu', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },
  },
  palette: {
    mode,
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
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f7fa',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: mode === 'dark' 
            ? 'linear-gradient(135deg, #1e1e1e 0%, #121212 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '100vh',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

export default getTheme;
