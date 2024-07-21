import React, { useDebugValue } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { librarianActions } from "../../Store/Librarian";
import { userActions } from "../../Store/User";

const userFeaturesViews = [
  { pageName: "Home", routeTo: "/" },
  { pageName: "Search Book", routeTo: "/search-book" },
  { pageName: "My Books", routeTo: "/my-books" },
];
const userAuthViews = [{ pageName: "Log Out" }];

const librarianFeaturesViews = [
  { pageName: "Home", routeTo: "/" },
  { pageName: "Add Book", routeTo: "/add-book" },
  { pageName: "Library Books", routeTo: "/library-books" },
];
const librarianAuthViews = [{ pageName: "Log Out" }];

const visitorViews = [
  { pageName: "Home", routeTo: "/" },
  { pageName: "Search Book", routeTo: "/search-book" },
];
const visitorAuthViews = [
  { pageName: "Login", routeTo: "/user/login" },
  { pageName: "Sign Up", routeTo: "/user/sign-up" },
];

const NavigationBar = () => {
  const librarian = useSelector((state) => state.librarian.login);
  const user = useSelector((state) => state.user.login);
   
  const navigate=useNavigate()

  const dispatch=useDispatch()

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(librarianActions.libarianLogOut())
    dispatch(userActions.userLogOut())
    navigate('/')
    
  };

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
            {librarian &&
              librarianFeaturesViews.map((page) => (
                <NavLink to={`${page.routeTo}`}>
                  <Button
                    key={page.pageName}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.pageName}
                  </Button>
                </NavLink>
              ))}
            {user &&
              userFeaturesViews.map((page) => (
                <NavLink to={`${page.routeTo}`}>
                  <Button
                    key={page.pageName}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.pageName}
                  </Button>
                </NavLink>
              ))}
            {!librarian &&
              !user &&
              visitorViews.map((page) => (
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
          <Box sx={{ display: "flex" }}>
            {user &&
              userAuthViews.map(
                (page) =>
                  page.pageName == "Log Out" && (
                    <Button
                      key={page.pageName}
                      onClick={logoutHandler}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.pageName}
                    </Button>
                  )
              )}

            {librarian &&
              librarianAuthViews.map((page) =>
                page.pageName == "Log Out" &&
                  <Button
                    key={page.pageName}
                    onClick={logoutHandler}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.pageName}
                  </Button>
              )}

            {!user &&
              !librarian &&
              visitorAuthViews.map((page) => (
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
