import { createSlice } from "@reduxjs/toolkit";

const libararianInitialState = {
  login:false,
  token: "",
  searchResult:[{title:'a book',category:'roman',author:'eswar',copies:34}],
  refresh:false
};

const LibrarianSlice = createSlice({
  name: "librarian",
  initialState: libararianInitialState,
  reducers: {
    login(state) {
      state.login = !state.login;   
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    libarianLogOut(state) {
      state.login = false;
      state.token = "";
    },
    setSearchResult(state,action){
      state.searchResult=action.payload
    }
    ,
    setRefresh(state){
      state.refresh=true
    },
    setRefreshDefault(state){
      state.refresh=false
    }
  },
});

export const librarianActions = LibrarianSlice.actions;
export default LibrarianSlice.reducer;
