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
import { NavLink } from "react-router-dom";

const defaultTheme = createTheme();

const AddNewBook = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Typography component="h1" variant="h5">
            New Book
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
                  label="Book Title"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth label="Category" type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Author" type="text" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="No of Copies"
                  type="text"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              alignItems="center"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddNewBook;
