import { createSlice } from "@reduxjs/toolkit";

const SearchName = createSlice({
    name: "searchName",
    initialState: '',
    reducers: {
        editSearchName(state, { payload }) {
            return payload
        }
    }
})

const { editSearchName } = SearchName.actions;

export { editSearchName };
export default SearchName.reducer

