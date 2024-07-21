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
import { useSelector } from "react-redux";

const defaultTheme = createTheme();



const AddNewBook = () => {
  
  const token=useSelector((state)=>state.librarian.token)

  const [newBookDetails, setNewBookDetails] = React.useState({
    title: "",
    category: "",
    author: "",
    copies: "",
  });

  const titleHandler = (e) => {
    setNewBookDetails({ ...newBookDetails, ["title"]: e.target.value });
  };

  const categoryHandler = (e) => {
    setNewBookDetails({ ...newBookDetails, ["category"]: e.target.value });
  };

  const authorHandler = (e) => {
    setNewBookDetails({ ...newBookDetails, ["author"]: e.target.value });
  };

  const copiesHandler = (e) => {
    setNewBookDetails({ ...newBookDetails, ["copies"]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResult = await fetch(
      `${process.env.REACT_APP_BASE_URL}/librarian/add-book`,
      {
        method: "POST",
        body: JSON.stringify({
          title: newBookDetails.title,
          category: newBookDetails.category,
          author: newBookDetails.author,
          copies: newBookDetails.copies,
        }),
        headers: {
          "Content-Type": "application/json",
           token:token
        },
      }
    );

    const response = await loginResult.json();

    console.log(response.status);
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
                  value={newBookDetails.title}
                  onChange={titleHandler}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Category"
                  type="text"
                  value={newBookDetails.category}
                  onChange={categoryHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Author"
                  type="text"
                  value={newBookDetails.author}
                  onChange={authorHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="No of Copies"
                  type="number"
                  value={newBookDetails.copies}
                  onChange={copiesHandler}
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
