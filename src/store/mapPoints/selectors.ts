import { createSelector } from "@reduxjs/toolkit";

import { MapPointCategory } from "@models/mapPoints/enums";
import { RootState } from "@store/index";

export const selectAllMapPoints = (state: RootState) => state.mapPoints.mapPoints;
export const selectPlaces = createSelector(
    [selectAllMapPoints],
    (mapPoints) => mapPoints.filter((mapPoint) => mapPoint.properties.category === MapPointCategory.PLACE)
);
export const selectEvents = createSelector(
    [selectAllMapPoints],
    (mapPoints) => mapPoints.filter((mapPoint) => (
        (mapPoint.properties.category === MapPointCategory.EVENT && mapPoint.properties.places.length === 0) ||
        (mapPoint.properties.category === MapPointCategory.PLACE && mapPoint.properties.events.length > 0)
    ))
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
