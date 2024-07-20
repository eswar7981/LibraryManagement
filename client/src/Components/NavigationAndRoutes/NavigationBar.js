import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const userFeaturesViews = [
  { pageName: "Home", routeTo: "/" },
  { pageName: "Search Book", routeTo: "/search-book" },
  { pageName: "My Books", routeTo: "/my-books" },
];
const userAuthViews = [{ pageName: "Log Out", routeTo: "/logout" }];

const librarianFeaturesViews = [
  { pageName: "Home", routeTo: "/" },
  { pageName: "Search Book", routeTo: "/search-book" },
  { pageName: "Add Book", routeTo: "/add-book" },
  { pageName: "Library Books", routeTo: "/library-books" },
];
const librarianAuthViews = [{ pageName: "Log Out", routeTo: "/logout" }];

const withOutLoginViews = [
  { pageName: "Home", routeTo: "/" },
  { pageName: "Search Book", routeTo: "/search-book" },
];
const withOutLoginAuthViews = [
  { pageName: "Login", routeTo: "/user/login" },
  { pageName: "Sign Up", routeTo: "/user/sign-up" },
];

const NavigationBar = () => {
  const librarian = useSelector((state) => state.user.login);

  return (
    <div>
      <AppBar position="static">
        <Container
          sx={{
            color: "primary",
            
            display: "flex",
          }}
          maxWidth="xl"
        >
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", gap: "20px" },
            }}
          >
            {withOutLoginViews.map((page) => (
              <NavLink to={`${page.routeTo}`}>
                <Button
                  key={page.pageName}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.pageName}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Box sx={{display:'flex'}}>
            {withOutLoginAuthViews.map((page) => (
              <NavLink to={`${page.routeTo}`}>
                <Button
                  key={page.pageName}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.pageName}
                </Button>
              </NavLink>
            ))}
          </Box>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
