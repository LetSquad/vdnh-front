import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { mapPointsUrl } from "@api/apiUrls";
import { getLanguageFromLocalStorage } from "@coreUtils/localizations/utils";
import { changeLanguage } from "@hooks/useChangeLanguage";
import { MapPointFeature, MapPointInfo } from "@models/mapPoints/types";
import { MapPointsResponse } from "@models/responses/types";
import { localizePlace, localizePlaces } from "@store/mapPoints/utils";

import i18n from "@i18n";

import { mapPoints } from "../../mapPoints";

interface MapPointsState {
    mapPoints: MapPointFeature[];
    currentMapPointInfo?: MapPointInfo;
    isMapPointsInitialState: boolean;
    isMapPointsLoading: boolean;
    isMapPointsLoadingFailed: boolean;
}

const _lang = getLanguageFromLocalStorage();

const formatMapPoints = mapPoints.map((mapPoint) => {
    if (mapPoint.properties && _lang) {
        if (mapPoint.properties.url === window.location.pathname) {
            mapPoint.properties = { ...mapPoint.properties, active: true };
        }

        localizePlace(mapPoint, _lang);
    }

    return mapPoint;
});

const initialState: MapPointsState = {
    mapPoints: formatMapPoints,
    currentMapPointInfo: undefined,
    isMapPointsInitialState: false,
    isMapPointsLoading: false,
    isMapPointsLoadingFailed: false
};

export const getMapPointsRequest = createAsyncThunk("getPlacesRequest", async () => {
    const response: AxiosResponse<MapPointsResponse> = await axios.get<MapPointsResponse>(mapPointsUrl);

    return response.data;
});

export const mapPointsSlice = createSlice({
    name: "mapPoints",
    initialState,
    reducers: {
        setMapPointActive: (state, action: PayloadAction<number | string | undefined>) => {
            const oldActiveMapPoint = state.mapPoints.find((mapPoint) => mapPoint.properties?.active === true);

            if (oldActiveMapPoint) {
                oldActiveMapPoint.properties = { ...oldActiveMapPoint.properties, active: false };
            }

            const currentMapPoint = state.mapPoints.find((mapPoint) => mapPoint.id === action.payload);

            if (currentMapPoint) {
                currentMapPoint.properties = { ...currentMapPoint.properties, active: true };
                state.currentMapPointInfo = {
                    id: currentMapPoint.id,
                    category: currentMapPoint.properties.category
                };
            }
        },
        setMapPointsUnActive: (state) => {
            state.mapPoints = state.mapPoints.map((mapPoint) => {
                mapPoint.properties = { ...mapPoint.properties, active: false };

                return mapPoint;
            });

            state.currentMapPointInfo = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMapPointsRequest.pending, (state) => {
            state.isMapPointsLoading = true;
            state.isMapPointsInitialState = false;
            state.isMapPointsLoadingFailed = false;
            state.mapPoints = [];
        });
        builder.addCase(getMapPointsRequest.rejected, (state) => {
            state.isMapPointsLoading = false;
            state.isMapPointsLoadingFailed = true;
        });
        builder.addCase(getMapPointsRequest.fulfilled, (state, action) => {
            state.isMapPointsLoading = false;

            const lang = i18n.language;

            state.mapPoints = action.payload.mapData.map((mapPoint) => {
                if (mapPoint.properties.url === window.location.pathname) {
                    mapPoint.properties = {
                        ...mapPoint.properties,
                        active: true
                    };

                    state.currentMapPointInfo = {
                        id: mapPoint.id,
                        category: mapPoint.properties.category
                    };
                }

                localizePlace(mapPoint, lang);

                return mapPoint;
            });
        });
        builder.addCase(changeLanguage.type, (state, action: PayloadAction<string>) => {
            const lang = action.payload;

            state.mapPoints = localizePlaces(state.mapPoints, lang);
        });
    }
});

export const { setMapPointActive, setMapPointsUnActive } = mapPointsSlice.actions;

export default mapPointsSlice.reducer;
