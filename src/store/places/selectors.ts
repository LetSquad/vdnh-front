import { createSelector } from "@reduxjs/toolkit";

import { ObjectType } from "@models/places/enums";
import { RootState } from "@store/index";

export const selectAllObjects = (state: RootState) => state.places.places;
export const selectPlaces = createSelector(
    [selectAllObjects],
    (objects) => objects.filter((object) => object.properties.category === ObjectType.PLACE)
);

export const selectEvents = createSelector(
    [selectAllObjects],
    (objects) => objects.filter((object) => (
        (object.properties.category === ObjectType.EVENT && object.properties.places.length === 0) ||
        (object.properties.category === ObjectType.PLACE && object.properties.events.length > 0)
    ))
);

export const selectIsPlacesLoading = (state: RootState) => state.places.isPlacesLoading;
export const selectIsPlacesLoadingFailed = (state: RootState) => state.places.isPlacesLoadingFailed;

export const selectCurrentPlaceId = (state: RootState) => state.places.currentPlaceId;
export const selectCurrentPlace = createSelector(
    [selectPlaces, selectCurrentPlaceId],
    (places, currentPlaceId) => places.find((place) => place.id === currentPlaceId)
);
