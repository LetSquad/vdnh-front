import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { routeUrl } from "@api/apiUrls";
import { RouteResponse } from "@models/responses/types";
import { Route, RouteFiltersFormValues } from "@models/userRoutes/types";

interface RoutesState {
    routes?: Route[];
    reviewRoute?: Route;
    selectedRoute?: Route;
    isRouteLoading: boolean;
    isRouteLoadingFailed: boolean;
    isRouteEmpty: boolean;
}

const initialState: RoutesState = {
    routes: undefined,
    selectedRoute: undefined,
    reviewRoute: undefined,
    isRouteLoading: false,
    isRouteLoadingFailed: false,
    isRouteEmpty: false
};

export const getRouteRequest = createAsyncThunk("getRouteRequest", async (values: RouteFiltersFormValues) => {
    const response: AxiosResponse<RouteResponse> = await axios.post<RouteResponse>(routeUrl, values);

    return response.data;
});

export const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
        resetRoute: (state) => {
            state.routes = undefined;
            state.selectedRoute = undefined;
            state.reviewRoute = undefined;
        },
        changeReviewRoute: (state, action: PayloadAction<Route>) => {
            state.reviewRoute = action.payload;
        },
        selectRoute: (state) => {
            state.selectedRoute = state.reviewRoute;
            state.reviewRoute = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRouteRequest.pending, (state) => {
            state.isRouteLoading = true;
            state.isRouteLoadingFailed = false;
            state.isRouteEmpty = false;
            state.routes = undefined;
            state.selectedRoute = undefined;
            state.reviewRoute = undefined;
        });
        builder.addCase(getRouteRequest.rejected, (state) => {
            state.isRouteLoading = false;
            state.isRouteLoadingFailed = true;
        });
        builder.addCase(getRouteRequest.fulfilled, (state, action) => {
            state.isRouteLoading = false;

            if (action.payload.mapData.length > 0) {
                state.routes = action.payload.mapData;
                [state.reviewRoute] = action.payload.mapData;
            } else {
                state.isRouteEmpty = true;
            }
        });
    }
});

export const { resetRoute, changeReviewRoute, selectRoute } = routesSlice.actions;

export default routesSlice.reducer;
