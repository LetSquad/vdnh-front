import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { preparedRouteUrl } from "@api/apiUrls";
import { PreparedRoute, PreparedRouteInfo, PreparedRouteRequestData } from "@models/preparedRoutes/types";
import { PreparedRoutesResponse } from "@models/responses/types";

interface PreparedRoutesState {
    preparedRoutes?: PreparedRouteInfo[];
    isPreparedRoutesLoading: boolean;
    isPreparedRoutesLoadingFailed: boolean;
    currentRoute?: PreparedRoute;
    isCurrentPreparedRouteLoading: boolean;
    isCurrentPreparedRouteLoadingFailed: boolean;
}

const initialState: PreparedRoutesState = {
    preparedRoutes: undefined,
    isPreparedRoutesLoading: false,
    isPreparedRoutesLoadingFailed: false,
    currentRoute: undefined,
    isCurrentPreparedRouteLoading: false,
    isCurrentPreparedRouteLoadingFailed: false
};

export const getPreparedRoutesRequest = createAsyncThunk("getPreparedRoutesRequest", async () => {
    const response: AxiosResponse<PreparedRoutesResponse> = await axios.get<PreparedRoutesResponse>(preparedRouteUrl);

    return response.data;
});

export const getPreparedRouteRequest = createAsyncThunk("getPreparedRouteRequest", async (value: PreparedRouteRequestData) => {
    const response: AxiosResponse<PreparedRoute> = await axios.post<PreparedRoute>(preparedRouteUrl, value);

    return response.data;
});

export const preparedRoutesSlice = createSlice({
    name: "preparedRoutes",
    initialState,
    reducers: {
        resetCurrentRoute: (state) => {
            state.currentRoute = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPreparedRoutesRequest.pending, (state) => {
            state.isPreparedRoutesLoading = true;
            state.isPreparedRoutesLoadingFailed = false;
            state.preparedRoutes = undefined;
            state.currentRoute = undefined;
        });
        builder.addCase(getPreparedRoutesRequest.rejected, (state) => {
            state.isPreparedRoutesLoading = false;
            state.isPreparedRoutesLoadingFailed = true;
        });
        builder.addCase(getPreparedRoutesRequest.fulfilled, (state, action) => {
            state.isPreparedRoutesLoading = false;

            state.preparedRoutes = action.payload.mapData;
        });
        builder.addCase(getPreparedRouteRequest.pending, (state) => {
            state.isCurrentPreparedRouteLoading = true;
            state.isCurrentPreparedRouteLoadingFailed = false;
            state.currentRoute = undefined;
        });
        builder.addCase(getPreparedRouteRequest.rejected, (state) => {
            state.isCurrentPreparedRouteLoading = false;
            state.isCurrentPreparedRouteLoadingFailed = true;
        });
        builder.addCase(getPreparedRouteRequest.fulfilled, (state, action) => {
            state.isCurrentPreparedRouteLoading = false;

            state.currentRoute = action.payload;
        });
    }
});

export const { resetCurrentRoute } = preparedRoutesSlice.actions;

export default preparedRoutesSlice.reducer;
