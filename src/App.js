import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#2196F3",
            light: "#64B5F6",
            dark: "#1976D2",
          },
          secondary: {
            main: "#FF4081",
            light: "#FF80AB",
            dark: "#F50057",
          },
          background: {
            default: darkMode ? '#121212' : '#f5f7fa',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: "'Ubuntu', sans-serif",
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 500 },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                background: darkMode 
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
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
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
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/dashboard" element={<DashboardPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/login" element={<LoginPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/register" element={<RegisterPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
