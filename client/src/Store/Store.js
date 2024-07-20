import { configureStore } from "@reduxjs/toolkit";

import userAuthenticationReducer from "./UserStore";

import UserReducer from "./UserStore";
import LibrarianReducer from "./LibrarianStore";

const store = configureStore({
  reducer: { user: UserReducer, librarian: LibrarianReducer },
});

export default store;