import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../UserAuthentication/Login";
import SignUp from "../UserAuthentication/SignUp";
import LibrarianLogin from "../LibrarianAuthentication/Login";
import LibrarianSignUp from "../LibrarianAuthentication/SignUp";
import SearchBook from "../../ReusableComponents/Search/SearchBook";
import MyBooks from "../UserFeatures/MyBooks";

import AddNewBook from "../LibrarianFeatures/AddNewBook";
import Home from "../CommonFeatures/Carousel/Home"

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
     
        <Route path="/my-books" element={<MyBooks></MyBooks>}></Route>
        <Route path="/add-book" element={<AddNewBook></AddNewBook>}></Route>
        <Route path="/library-books" element={<SearchBook></SearchBook>}></Route>
        <Route path="/user/login" element={<Login></Login>}></Route>
        <Route path="/user/sign-up" element={<SignUp></SignUp>}></Route>
        <Route
          path="/librarian/login"
          element={<LibrarianLogin></LibrarianLogin>}
        ></Route>
        <Route
          path="/librarian/sign-up"
          element={<LibrarianSignUp></LibrarianSignUp>}
        ></Route>
        <Route path="/search-book" element={<SearchBook></SearchBook>}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
