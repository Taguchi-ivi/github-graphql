
import { configureStore } from "@reduxjs/toolkit";
import searchName from "./modules/searchName";
import cursor from "./modules/cursor";
import repositoryCount from "./modules/repositoryCount";
import searchResults from "./modules/searchResults";

export default configureStore({
    reducer: {
        searchName: searchName,
        cursor: cursor,
        repositoryCount: repositoryCount,
        searchResults: searchResults
    }
})