import { createSlice } from "@reduxjs/toolkit";

type Repository = {
    id: string;
    url: string;
    name: string;
    description: string;
    owner: {
        login: string;
    }
}

const searchResults = createSlice({
    name: "searchResults",
    initialState: {
        value: [] as Repository[]
    },
    reducers: {
        resetSearchResult: (state) => {
            state.value = []
        },
        addSearchResult(state, { payload }) {
            state.value.push(...payload);
        }
    }
})

export const { resetSearchResult, addSearchResult } = searchResults.actions;
export default searchResults.reducer

