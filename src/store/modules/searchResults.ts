import { createSlice } from "@reduxjs/toolkit";

const searchResults = createSlice({
    name: "searchResults",
    initialState: {
        id: '',
        url: '',
        name: '',
        description: '',
        createdAt: '',
    },
    reducers: {
        editSearchResult(state, { payload }) {
            return payload
        }
    }
})

const { editSearchResult } = searchResults.actions;

export { editSearchResult };
export default searchResults.reducer

