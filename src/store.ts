import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./store/loginSlice.ts";

export default configureStore({
    reducer: {
        login: loginReducer
    },
});