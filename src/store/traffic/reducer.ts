import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { DateTime } from "luxon";

import { trafficUrl } from "@api/apiUrls";
import { TrafficResponse } from "@models/responses/types";
import { TrafficFeature } from "@models/traffic/types";

interface TrafficState {
    traffic?: TrafficFeature[];
    isTrafficLoading: boolean;
    isTrafficLoadingFailed: boolean;
}

const initialState: TrafficState = {
    traffic: undefined,
    isTrafficLoading: false,
    isTrafficLoadingFailed: false
};

export const getTrafficRequest = createAsyncThunk("getTrafficRequest", async (values?: { day: number, time: string }) => {
    const now = DateTime.now().setLocale("en");
    const response: AxiosResponse<TrafficResponse> = await axios.get<TrafficResponse>(
        trafficUrl,
        { params: { day: values?.day || now.weekdayLong.toUpperCase(), time: values?.time || now.toFormat("hh:mm") } }
    );

    return response.data;
});

export const trafficSlice = createSlice({
    name: "traffic",
    initialState,
    reducers: {
        resetTraffic: (state) => {
            state.traffic = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTrafficRequest.pending, (state) => {
            state.isTrafficLoading = true;
            state.isTrafficLoadingFailed = false;
            state.traffic = undefined;
        });
        builder.addCase(getTrafficRequest.rejected, (state) => {
            state.isTrafficLoading = false;
            state.isTrafficLoadingFailed = true;
        });
        builder.addCase(getTrafficRequest.fulfilled, (state, action) => {
            state.isTrafficLoading = false;

            state.traffic = action.payload.heatmap;
        });
    }
});

export const { resetTraffic } = trafficSlice.actions;

export default trafficSlice.reducer;
