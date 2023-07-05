import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./State";

const dataStore = configureStore({
  reducer: { userProfile: userSlice },
});

export default dataStore;
