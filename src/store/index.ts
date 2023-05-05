
import { configureStore } from "@reduxjs/toolkit";
import searchName from "./modules/searchName";
import searchResults from "./modules/searchResults";

export default configureStore({
    reducer: {
        searchName: searchName,
        searchResults: searchResults
    }
})