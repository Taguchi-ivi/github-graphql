import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type History = {
    id: string;
    name: string;
}

const searchHistory = createSlice({
    name: "searchHistory",
    initialState: {
        value: [] as History[]
    },
    reducers: {
        editSearchHistory(state, { payload }) {
            const str = payload.trim();
            if (str !== '') {
                if(state.value.length > 0) {
                    state.value = state.value.filter(item => item.name !== payload);
                }
                const newArray = {
                    id: uuidv4(),
                    name: payload
                }
                state.value.unshift(newArray);
            }
        }
    }
})

export const { editSearchHistory } = searchHistory.actions;
export default searchHistory.reducer

