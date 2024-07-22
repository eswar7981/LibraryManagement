import { Container, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { userActions } from "../../Store/User";
import { librarianActions } from "../../Store/Librarian";
import { visitorActions } from "../../Store/Visitor";
import { useSelector } from "react-redux";
const theme = createTheme({
  spacing: 4,
});

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const refreshPage = useSelector((state) => state.librarian.refresh);

  const [displayMessage, setDisplayMessage] = React.useState({
    status: false,
    message: "",
    mode: "",
  });

  const [searchDetails, setSearchDetails] = useState({
    title: "",
    category: "",
    author: "",
  });

  const searchTitleSuggestionHandler = (e) => {
    setSearchDetails({ ...searchDetails, ["title"]: e.target.value });
  };
  const searchCategorySuggestionHandler = (e) => {
    setSearchDetails({ ...searchDetails, ["category"]: e.target.value });
  };

  const searchAuthorSuggestionHandler = (e) => {
    setSearchDetails({ ...searchDetails, ["author"]: e.target.value });
  };

  refreshPage &&
    fetch(
      `${process.env.REACT_APP_BASE_URL}/search?title=${searchDetails.title}&category=${searchDetails.category}&author=${searchDetails.author}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(librarianActions.setRefreshDefault());
        dispatch(librarianActions.setSearchResult(res.books));
      });

  const handleSearch = async (e) => {
    e.preventDefault();
    const search = await fetch(
      `${process.env.REACT_APP_BASE_URL}/search?title=${searchDetails.title}&category=${searchDetails.category}&author=${searchDetails.author}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await search.json();

    if (response.status === "success") {
      if (response.books.length === 0) {
        setDisplayMessage({
          status: true,
          mode: "info",
          message: "No books found",
        });

        setTimeout(() => {
          setDisplayMessage({ ...displayMessage, ["status"]: false });
        }, 2000);
      }
      switch (props.mode) {
        case "user":
          dispatch(userActions.setSearchResult(response.books));
        case "librarian":
          dispatch(librarianActions.setRefreshDefault());
          dispatch(librarianActions.setSearchResult(response.books));
        case "visitor":
          dispatch(visitorActions.setSearchResult(response.books));
      }
    }
  };

  return (
    <>
      {displayMessage.status && (
        <div style={{ position: "fixed", top: "80px" }}>
          <Alert severity="info">{displayMessage.message}</Alert>
        </div>
      )}
      <Container component="main" maxWidth="sm">
        <form>
          <Typography
            sx={{ mt: "20px" }}
            component="h1"
            align="center"
            variant="h5"
          >
            Search Book
          </Typography>
          <Container
            spacing
            sx={{
              display: "flex",
              mt: 4,
              gap: "10px",
              backgroundColor: "white",
            }}
          >
            <Box maxWidth="xl">
              <TextField
                sx={{ mt: 2 }}
                onChange={searchTitleSuggestionHandler}
                placeholder="Title"
                required
                type="text"
                size="small"
                value={searchDetails.title}
              ></TextField>
            </Box>
            <Box maxWidth="xl">
              <TextField
                sx={{ mt: 2 }}
                onChange={searchCategorySuggestionHandler}
                placeholder="Category"
                required
                type="text"
                size="small"
                value={searchDetails.category}
              ></TextField>
            </Box>
            <Box maxWidth="xl">
              <TextField
                sx={{ mt: 2 }}
                onChange={searchAuthorSuggestionHandler}
                placeholder="Author"
                required
                type="text"
                size="small"
                value={searchDetails.author}
              ></TextField>
            </Box>
            <IconButton onClick={handleSearch}>
              <SearchIcon style={{ fill: "#214683" }}></SearchIcon>
            </IconButton>
          </Container>
          <Typography align="center" sx={{ mt: 2, color: "grey" }}>
            ( * press search without any value to fetch all books )
          </Typography>
        </form>
      </Container>
    </>
  );
};

export default SearchBar;
