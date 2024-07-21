import { configureStore } from "@reduxjs/toolkit";

import userAuthenticationReducer from "./User";

import UserReducer from "./User";
import LibrarianReducer from "./Librarian";
import VisitorReducer from "./Visitor";

const store = configureStore({
  reducer: {
    user: UserReducer,
    librarian: LibrarianReducer,
    visitor: VisitorReducer,
  },
});

export default store;
