
import { configureStore } from "@reduxjs/toolkit";
import searchName from "./modules/searchName";
import cursor from "./modules/cursor";
import searchResults from "./modules/searchResults";

export default configureStore({
    reducer: {
        searchName: searchName,
        cursor: cursor,
        searchResults: searchResults
    }
})