import { createSlice } from "@reduxjs/toolkit";

type PageInfo = {
    firstFlg: boolean;
    cursor: string | null;
    hasNextPage: boolean;
}

const pageInfo = createSlice({
    name: "cursor",
    initialState: {
        firstFlg: true,
        cursor: null,
        hasNextPage: false
    } as PageInfo,
    reducers: {
        editPageInfo(state, { payload }) {
            return {
                firstFlg: false,
                cursor: payload.endCursor,
                hasNextPage: payload.hasNextPage
            }
        },
        resetPageInfo(state) {
            return {
                firstFlg: true,
                cursor: null,
                hasNextPage: false
            }
        }
    }
})

export const { editPageInfo, resetPageInfo } = pageInfo.actions;
export default pageInfo.reducer

