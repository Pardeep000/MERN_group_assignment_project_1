import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";

const store = configureStore({
  reducer: {
    userdata: userReducer,
  }
});

export default store;
