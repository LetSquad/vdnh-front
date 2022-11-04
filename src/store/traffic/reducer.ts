import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

import { trafficUrl } from "@api/apiUrls";
import { TrafficResponse } from "@models/responses/types";
import { TrafficFeature } from "@models/traffic/types";

import i18n from "@i18n";

interface TrafficState {
    traffic?: TrafficFeature[];
    isTrafficLoading: boolean;
}

const initialState: TrafficState = {
    traffic: undefined,
    isTrafficLoading: false
};

export const getTrafficRequest = createAsyncThunk("getTrafficRequest", async (values?: { day: number, time: string }) => {
    const response: AxiosResponse<TrafficResponse> = await axios.get<TrafficResponse>(
        trafficUrl,
        { params: { day: values?.day, time: values?.time } }
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
            state.traffic = undefined;
        });
        builder.addCase(getTrafficRequest.rejected, (state) => {
            state.isTrafficLoading = false;

            toast.error(i18n.t(
                "errors:traffic",
                "При получении информации о загруженности объектов произошла ошибка. Попробуйте позже, пожалуйста"
            ) as string);
        });
        builder.addCase(getTrafficRequest.fulfilled, (state, action) => {
            state.isTrafficLoading = false;

            state.traffic = action.payload.heatmap;
        });
    }
});

export const { resetTraffic } = trafficSlice.actions;

export default trafficSlice.reducer;
