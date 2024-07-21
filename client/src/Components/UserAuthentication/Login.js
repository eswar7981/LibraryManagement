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
import { userActions } from "../../Store/User";

const defaultTheme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
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
    console.log(loginDetails);

    const loginResult = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/authentication/login`,
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
      dispatch(userActions.login())
      dispatch(userActions.setToken(response.token));
      navigate('/')
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
            Sign in
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
              autoComplete="email"
              autoFocus
              onChange={changeEmail}
              value={loginDetails.email}
            />
            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              label="Password"
              onChange={changePassword}
              value={loginDetails.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink to="/user/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/librarian/login" variant="body2">
                  {"Are you a Librarian ? Login"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
