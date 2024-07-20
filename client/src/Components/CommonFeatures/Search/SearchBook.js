import React from "react";
import BookCategories from "../HomePage/BookCategories";
import { createTheme, ThemeProvider } from "@mui/material";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

const defaultTheme = createTheme();
const SearchBook = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SearchBar></SearchBar>
      <SearchResult></SearchResult>
    </ThemeProvider>
  );
};

export default SearchBook;
