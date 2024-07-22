import { createSlice } from "@reduxjs/toolkit";

const VisitorInitialState = {
  searchResult: []
,
};

const VisitorSlice = createSlice({
  name: "visitor",
  initialState: VisitorInitialState,
  reducers: {
    setSearchResult(state, action) {
      state.searchResult = action.payload;
    },
  },
});

export const visitorActions = VisitorSlice.actions;
export default VisitorSlice.reducer;
