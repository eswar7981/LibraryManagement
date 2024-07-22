import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import SearchBar from "./SearchBar";
import ResultTable from "./ResultTable";
import { useSelector } from "react-redux";

const defaultTheme = createTheme();
const SearchBook = () => {
  const librarian = useSelector((state) => state.librarian.login);
  const user = useSelector((state) => state.user.login);

  const userSearchResult = useSelector((state) => state.user.searchResult);
  const libararianSearchResult = useSelector(
    (state) => state.librarian.searchResult
  );
  const visitorSearchResult = useSelector(
    (state) => state.visitor.searchResult
  );

  const refresh = (e) => {
    e.preventDefault();
    console.log("refresh");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {user && (
        <>
          <SearchBar mode="user"></SearchBar>
          <ResultTable mode="user" data={userSearchResult}></ResultTable>
        </>
      )}
      {librarian && (
        <>
          <SearchBar mode="librarian"></SearchBar>
          <ResultTable
            mode="librarian"
            data={libararianSearchResult}
          ></ResultTable>
        </>
      )}
      {!user && !librarian && (
        <>
          <SearchBar mode="visitor"></SearchBar>
          <ResultTable
            refresh={refresh}
            mode="visitor"
            data={visitorSearchResult}
          ></ResultTable>
        </>
      )}
    </ThemeProvider>
  );
};

export default SearchBook;
