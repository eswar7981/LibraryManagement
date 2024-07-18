import React from "react";
import { Route ,Routes} from 'react-router-dom'
import Home from '../CommonFeatures/HomePage/Home'
import Login from "../UserAuthentication/Login";
import SignUp from "../UserAuthentication/SignUp";
import LibrarianLogin from "../LibrarianAuthentication/Login"
import LibrarianSignUp from "../LibrarianAuthentication/SignUp"



const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/user/login" element={<Login></Login>}></Route>
        <Route path="/user/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/librarian/login" element={<LibrarianLogin></LibrarianLogin>}></Route>
        <Route path="/librarian/sign-up" element={<LibrarianSignUp></LibrarianSignUp>}></Route>
      
      
      </Routes>
    </>
  );
};

export default AllRoutes;
