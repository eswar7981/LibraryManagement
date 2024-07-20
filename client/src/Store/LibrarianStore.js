import { createSlice } from "@reduxjs/toolkit";

const LibararianInitialState = {
  login: false,
  token: "",
  
};

const LibrarianSlice = createSlice({
  name: "librarian",
  initialState: LibararianInitialState,
  reducers: {
    login(state) {
      state.login = !state.login;
      console.log(state.login);
    },
    logout(state) {
      state.login = !state.login;
      console.log(state.login);
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    userLogOut(state) {
      state.login = false;
      state.followers = 0;
      state.token = "";
    },
    setFollowers(state, action) {
      state.followers = action.payload;
    },
  },
});

export const librarianActions = LibrarianSlice.actions;
export default LibrarianSlice.reducer;
