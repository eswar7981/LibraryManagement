import logo from "./logo.svg";
import "./App.css";

import NavigationBar from "./Components/NavigationAndRoutes/NavigationBar";
import AllRoutes from "./Components/NavigationAndRoutes/AllRoutes";

import { ThemeProvider } from "@emotion/react";
import Favicon from "react-favicon";
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
      <Favicon
        url=
          "data:image/png;base64,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"
        
      />
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
