import { createSlice } from "@reduxjs/toolkit";


const userInitialState = {
  login:false,
  token: "",
  searchResult:[{title:'a book',category:'roman',author:'eswar',available:true}]

};

const UserSlice = createSlice({
  name: "user",
  initialState:userInitialState,
  reducers: {
    login(state) {
      state.login = !state.login;
      console.log(state.login);
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    userLogOut(state) {
      state.login = false;
      state.token = "";
    },
    setSearchResult(state,action){
      state.searchResult=action.payload
    }

  },
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
