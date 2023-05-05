
import { configureStore } from "@reduxjs/toolkit";
import searchName from "./modules/searchName";
import pageInfo from "./modules/pageInfo";
import repositoryCount from "./modules/repositoryCount";
import searchResults from "./modules/searchResults";
import searchHistory from "./modules/searchHistory";

export default configureStore({
    reducer: {
        searchName,
        pageInfo,
        repositoryCount,
        searchResults,
        searchHistory
    }
})