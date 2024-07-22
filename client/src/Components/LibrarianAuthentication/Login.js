import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { librarianActions } from "../../Store/Librarian";
import Alert from "@mui/material/Alert";
const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const [loginDetails, setLoginDetails] = React.useState({
    email: "",
    password: "",
  });

  const changeEmail = (e) => {
    setLoginDetails({ ...loginDetails, ["email"]: e.target.value });
  };

  const changePassword = (e) => {
    setLoginDetails({ ...loginDetails, ["password"]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const loginResult = await fetch(
        `${process.env.REACT_APP_BASE_URL}/librarian/authentication/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: loginDetails.email,
            password: loginDetails.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await loginResult.json();

      if (response.status === "success") {
        dispatch(librarianActions.Login(true));
        dispatch(librarianActions.setToken(response.token));
        setDisplayMessage({
          status: true,
          mode: "success",
          message: "login successful",
        });
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        if (response.message === "email does not exist") {
          setDisplayMessage({
            status: true,
            mode: "info",
            message: "Email does not exist",
          });
        } else {
          setDisplayMessage({
            status: true,
            mode: "info",
            message: "Incorrect password",
          });
        }
      }
      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    } else {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "Fill all the fields",
      });

      setTimeout(() => {
        setDisplayMessage({ ...displayMessage, ["status"]: false });
      }, 2000);
    }
  };

  return (
    <>
      {displayMessage.status && (
        <div style={{ position: "fixed", top: "80px" }}>
          <Alert severity={displayMessage.mode}>{displayMessage.message}</Alert>
        </div>
      )}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Box
            onSubmit={handleSubmit}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Librarian Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoFocus
                onChange={changeEmail}
                value={loginDetails.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={changePassword}
                value={loginDetails.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <NavLink to="/librarian/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
