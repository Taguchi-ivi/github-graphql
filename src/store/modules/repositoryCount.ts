import { createSlice } from "@reduxjs/toolkit";

const repositoryCount = createSlice({
    name: "repositoryCount",
    initialState: {
        value: -1
    },
    reducers: {
        editRepositoryCount(state, { payload }) {
            return payload
        }
    }
})

const { editRepositoryCount } = repositoryCount.actions;

export { editRepositoryCount };
export default repositoryCount.reducer

