import { Container, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
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

  const reloadData=(e)=>{
    e.preventDefault()
    console.log('hii')
  }

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

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("search");
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
          sx={{ display: "flex", mt: 4, gap: "10px", backgroundColor: "white" }}
        >
          <Box maxWidth="xl">
            <TextField
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
        {refreshPage && reloadData()

        }
      </form>
    </Container>
  );
};

export default SearchBar;
