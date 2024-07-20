import { Container, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material";


const theme = createTheme({
  spacing: 4,
});

const SearchBar = () => {
  const [searchDetails, setSearchDetails] = useState({
    title: "",
    category: "",
    author: "",
  });

  const searchTitleSuggestionHandler = (e) => {
    console.log(e.target.value);
  };
  const searchCategorySuggestionHandler = (e) => {
    console.log(e.target.value);
  };

  const searchAuthorSuggestionHandler = (e) => {
    console.log(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="sm">
      <form>
        <Typography sx={{mt:'20px'}} component="h1" align="center" variant="h5">
          Search Book
        </Typography>
        <Container spacing sx={{ display: "flex", mt: 4 ,gap:'10px',backgroundColor:'white'}}>
          <Box maxWidth="xl">
            <TextField
              onChange={searchTitleSuggestionHandler}
              placeholder="Title"
              required
              type="text"
              size="small"
            ></TextField>
          </Box>
          <Box maxWidth="xl">
            <TextField
              onChange={searchCategorySuggestionHandler}
              placeholder="Category"
              required
              type="text"
              size="small"
            ></TextField>
          </Box>
          <Box maxWidth="xl">
            <TextField
              onChange={searchAuthorSuggestionHandler}
              placeholder="Author"
              required
              type="text"
              size="small"
            ></TextField>
          </Box>
          <IconButton onClick={handleSearch}>
            <SearchIcon style={{ fill: "#214683" }}></SearchIcon>
          </IconButton>
        </Container>
      </form>
    </Container>
  );
};

export default SearchBar;
