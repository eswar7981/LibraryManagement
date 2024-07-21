import * as React from "react";
import { NavLink } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

const SignUp = () => {
   
    const navigate=useNavigate()
  
    const [alert, setAlert] = React.useState({ state: false, message: "" });
  
  const [signUpDetails, setSignUpDetails] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    e.preventDefault();

    if (signUpDetails.password !== signUpDetails.confirmPassword) {
        console.log('wrong password')
      setAlert({
        state: true,
        message: "password and confirm password are not same",
      });

      setTimeout(() => {
        setAlert({ state: false });
      }, 2000);
    } else {
      const signUpResult = await fetch(
        `${process.env.REACT_APP_BASE_URL}/librarian/authentication/sign-up`,
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
      console.log(response.message)
      console.log(response.status);

    navigate('/librarian/login')
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
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
            Librarian Sign up
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
                  autoComplete="given-name"
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
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/user/login" variant="body2">
                  Are you an User? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
