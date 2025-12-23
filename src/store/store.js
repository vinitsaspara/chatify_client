import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js"
import chatReduer from "./slices/chatSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReduer
  },
});

export default store;
