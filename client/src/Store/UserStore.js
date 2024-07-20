import { createSlice } from "@reduxjs/toolkit";

const UserState = {
  login: false,
  token: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState:UserState,
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

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
