import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { placesUrl } from "@api/apiUrls";
import { changeLanguage } from "@hooks/useChangeLanguage";
import { ObjectFeature } from "@models/places/types";
import { PlacesResponse } from "@models/responses/types";
import { localizePlace, localizePlaces } from "@store/places/utils";

import i18n from "@i18n";

interface PlacesState {
    places: ObjectFeature[];
    currentPlaceId?: number | string;
    isPlacesInitialState: boolean;
    isPlacesLoading: boolean;
    isPlacesLoadingFailed: boolean;
}

const initialState: PlacesState = {
    places: [],
    currentPlaceId: undefined,
    isPlacesInitialState: false,
    isPlacesLoading: false,
    isPlacesLoadingFailed: false
};

export const getPlacesRequest = createAsyncThunk("getPlacesRequest", async () => {
    const response: AxiosResponse<PlacesResponse> = await axios.get<PlacesResponse>(placesUrl);

    return response.data;
});

export const placesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        setPlaceActive: (state, action: PayloadAction<number | string | undefined>) => {
            const oldActivePlace = state.places.find((place) => place.properties?.active === true);

            if (oldActivePlace) {
                oldActivePlace.properties = { ...oldActivePlace.properties, active: false };
            }

            const currentPlace = state.places.find((place) => place.id === action.payload);

            if (currentPlace) {
                currentPlace.properties = { ...currentPlace.properties, active: true };
                state.currentPlaceId = currentPlace.id;
            }
        },
        setPlacesUnActive: (state) => {
            state.places = state.places.map((place) => {
                place.properties = { ...place.properties, active: false };

                return place;
            });

            state.currentPlaceId = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPlacesRequest.pending, (state) => {
            state.isPlacesLoading = true;
            state.isPlacesInitialState = false;
            state.isPlacesLoadingFailed = false;
            state.places = [];
        });
        builder.addCase(getPlacesRequest.rejected, (state) => {
            state.isPlacesLoading = false;
            state.isPlacesLoadingFailed = true;
        });
        builder.addCase(getPlacesRequest.fulfilled, (state, action) => {
            state.isPlacesLoading = false;

            const lang = i18n.language;

            state.places = action.payload.dataBlock.map((place) => {
                if (place.properties.url === window.location.pathname) {
                    place.properties = {
                        ...place.properties,
                        active: true
                    };

                    state.currentPlaceId = place.id;
                }

                localizePlace(place, lang);

                return place;
            });
        });
        builder.addCase(changeLanguage.type, (state, action: PayloadAction<string>) => {
            const lang = action.payload;

            state.places = localizePlaces(state.places, lang);
        });
    }
});

export const { setPlaceActive, setPlacesUnActive } = placesSlice.actions;

export default placesSlice.reducer;
