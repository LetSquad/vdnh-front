import { createSlice } from "@reduxjs/toolkit";

interface InfoState {
    auth: boolean;
}

const initialState: InfoState = {
    auth: true
};

export const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {}
});

export default infoSlice.reducer;
