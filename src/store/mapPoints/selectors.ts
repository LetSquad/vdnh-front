import { createSelector } from "@reduxjs/toolkit";

import { MapPointCategory } from "@models/mapPoints/enums";
import { EventFeature, PlaceFeature } from "@models/mapPoints/types";
import { ExtendedTags } from "@models/places/enums";
import { RootState } from "@store/index";

export const selectAllMapPoints = (state: RootState) => state.mapPoints.mapPoints;
export const selectActiveTags = (state: RootState) => state.mapPoints.activeTags;
export const selectPlaces = createSelector(
    [selectAllMapPoints, selectActiveTags],
    (mapPoints, activeTags) => {
        const places = mapPoints.filter((mapPoint) => mapPoint.properties.category === MapPointCategory.PLACE) as PlaceFeature[];
        return places.filter((mapPoint) => activeTags.includes(mapPoint.properties.tag));
    }
);
export const selectEvents = createSelector(
    [selectAllMapPoints],
    (mapPoints) => mapPoints.filter((mapPoint) => mapPoint.properties.category === MapPointCategory.EVENT) as EventFeature[]
);
export const selectPlaceAndStandaloneEvents = createSelector(
    [selectAllMapPoints],
    (mapPoints) => mapPoints.filter((mapPoint) => (
        (mapPoint.properties.category === MapPointCategory.EVENT && mapPoint.properties.places.length === 0) ||
        (mapPoint.properties.category === MapPointCategory.PLACE && mapPoint.properties.events.length > 0)
    ))
);
export const selectPlacesAndStandaloneEvents = createSelector(
    [selectAllMapPoints],
    (mapPoints) => mapPoints.filter((mapPoint) => (
        (mapPoint.properties.category === MapPointCategory.EVENT && mapPoint.properties.places.length === 0) ||
        (mapPoint.properties.category === MapPointCategory.PLACE)
    ))
);

export const selectAllEntrance = createSelector(
    [selectPlaces],
    (places) => places.filter((place) => place.properties.tag === ExtendedTags.ENTRANCE)
);

const selectPlace = (_state: RootState, place?: PlaceFeature) => place;

export const selectAllEventsForPlace = createSelector(
    [selectEvents, selectPlace],
    (events, place) => (place ? events.filter((event) => event.properties.places.includes(place.id)) : [])
);

export const selectIsMapPointsInitialState = (state: RootState) => state.mapPoints.isMapPointsInitialState;
export const selectIsMapPointsLoading = (state: RootState) => state.mapPoints.isMapPointsLoading;
export const selectIsMapPointsLoadingFailed = (state: RootState) => state.mapPoints.isMapPointsLoadingFailed;

export const selectMapPointInfo = (state: RootState) => state.mapPoints.currentMapPointInfo;
export const selectCurrentMapPoint = createSelector(
    [selectAllMapPoints, selectMapPointInfo],
    (mapPoints, currentMapPointInfo) => mapPoints.find((mapPoint) => (
        mapPoint.id === currentMapPointInfo?.id && mapPoint.properties.category === currentMapPointInfo?.category
    ))
);

export const selectCurrentPlace = createSelector(
    [selectCurrentMapPoint],
    (mapPoint) => (mapPoint?.properties.category === MapPointCategory.PLACE ? mapPoint : undefined)
);
