import { createSlice } from "@reduxjs/toolkit";

const cursor = createSlice({
    name: "cursor",
    initialState: {
        value: null
    },
    reducers: {
        editCursor(state, { payload }) {
            return payload
        }
    }
})

const { editCursor } = cursor.actions;

export { editCursor };
export default cursor.reducer

