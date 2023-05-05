
import { configureStore } from "@reduxjs/toolkit";
import searchName from "./modules/searchName";

export default configureStore({
    reducer: {
        searchName: searchName
    }
})