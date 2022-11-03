import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { routeUrl } from "@api/apiUrls";
import { RouteResponse } from "@models/responses/types";
import { Route, RouteFiltersFormValues } from "@models/userRoutes/types";

interface RoutesState {
    route?: Route;
    isRouteLoading: boolean;
    isRouteLoadingFailed: boolean;
}

const initialState: RoutesState = {
    route: undefined,
    isRouteLoading: false,
    isRouteLoadingFailed: false
};

export const getRouteRequest = createAsyncThunk("getRouteRequest", async (values: RouteFiltersFormValues) => {
    const response: AxiosResponse<RouteResponse> = await axios.post<RouteResponse>(routeUrl, values);

    return response.data;
});

export const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRouteRequest.pending, (state) => {
            state.isRouteLoading = true;
            state.isRouteLoadingFailed = false;
            state.route = undefined;
        });
        builder.addCase(getRouteRequest.rejected, (state) => {
            state.isRouteLoading = false;
            state.isRouteLoadingFailed = true;
        });
        builder.addCase(getRouteRequest.fulfilled, (state, action) => {
            state.isRouteLoading = false;

            state.route = action.payload.mapData;
        });
    }
});

export default routesSlice.reducer;
