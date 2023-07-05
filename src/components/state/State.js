import { createSlice } from "@reduxjs/toolkit";

const userState = {
  token: "",
  user: null,
  userId: "",
};

const userSlice = createSlice({
  name: "userProfile",
  initialState: userState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    home(state, action) {
      state.user = action.payload;
    },
    set(state, action) {
      state.userId = action.payload;
    },
  },
});

export const UState = userState;
export const userAction = userSlice.actions;
export default userSlice.reducer;
