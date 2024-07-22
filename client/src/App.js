import logo from "./logo.svg";
import "./App.css";

import NavigationBar from "./Components/NavigationAndRoutes/NavigationBar";
import AllRoutes from "./Components/NavigationAndRoutes/AllRoutes";

import { ThemeProvider } from "@emotion/react";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#214683",
    },
    secondary: {
      main: "#333333",
    },
    neutral: {
      main: "#333333",
    },
  },
});

function App() {
  const fetchData = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
      });
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <header>
          <NavigationBar></NavigationBar>
        </header>
        <main>
          <AllRoutes></AllRoutes>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
