import { createSlice } from "@reduxjs/toolkit";

const searchResults = createSlice({
    name: "searchResults",
    initialState: {
        searchResult: [
            {
                id: '',
                url: '',
                name: '',
                description: '',
                createdAt: '',
            }
        ]
    },
    reducers: {
        addSearchResult(state, { payload }) {
            // state.searchResult = [...state.searchResult, payload]
            state.searchResult.push(payload);
        }
    }
})

const { addSearchResult } = searchResults.actions;

export { addSearchResult };
export default searchResults.reducer

