import * as React from "react";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Alert from "@mui/material/Alert";

const defaultTheme = createTheme();
const SignUp = () => {
  const ref = useRef();
  const [alert, setAlert] = useState({ state: false, message: "" });

  const navigate = useNavigate();

  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const changeName = (e) => {
    setSignUpDetails({ ...signUpDetails, ["name"]: e.target.value });
  };

  const changeEmail = (e) => {
    setSignUpDetails({ ...signUpDetails, ["email"]: e.target.value });
  };

  const changePassword = (e) => {
    setSignUpDetails({ ...signUpDetails, ["password"]: e.target.value });
  };

  const changeConfirmPassword = (e) => {
    setSignUpDetails({ ...signUpDetails, ["confirmPassword"]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log('ho')
    e.preventDefault();
    if (signUpDetails.password !== signUpDetails.confirmPassword) {
      setDisplayMessage({
        status: true,
        mode: "info",
        message: "password and confirm password are not same",
      });
    } else {
      if (e.target.checkValidity()) {
        const signUpResult = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/authentication/sign-up`,
          {
            method: "POST",
            body: JSON.stringify({
              name: signUpDetails.name,
              email: signUpDetails.email,
              password: signUpDetails.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const response = await signUpResult.json();

        if (response.status === "success") {
          setDisplayMessage({
            status: true,
            mode: "success",
            message: "sign-up is successfull!",
          });
          setTimeout(() => {
            navigate("/user/login");
          }, 500);
        } else {
          setDisplayMessage({
            status: true,
            mode: "info",
            message: "email already exists!",
          });
        }
      } else {
        setDisplayMessage({
          status: true,
          mode: "info",
          message: "Fill all the fields, check email format!",
        });
      }

    }

    setTimeout(() => {
      setDisplayMessage({ ...displayMessage, ["status"]: false });
    }, 2000);
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
          <CssBaseline />
          <Box 
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    label="Name"
                    onChange={changeName}
                    autoFocus
                    value={signUpDetails.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    onChange={changeEmail}
                    value={signUpDetails.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={changePassword}
                    value={signUpDetails.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={changeConfirmPassword}
                    value={signUpDetails.confirmPassword}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                <NavLink to="/librarian/login" variant="body2">
                    Already you a Librarian? Sign in as Librarian
                  </NavLink>
                 
                </Grid>
                <Grid item>
                <NavLink to="/user/login" variant="body2">
                    Already have an account? Sign in
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

export default SignUp;
