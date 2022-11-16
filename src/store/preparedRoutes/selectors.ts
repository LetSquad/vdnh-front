import { createSelector } from "@reduxjs/toolkit";

import { MapPointFeature } from "@models/mapPoints/types";
import { RootState } from "@store/index";
import { selectAllMapPoints } from "@store/mapPoints/selectors";

export const selectPreparedRoutes = (state: RootState) => state.preparedRoutes.preparedRoutes || [];
export const selectCurrentPreparedRoute = (state: RootState) => state.preparedRoutes.currentRoute;

export const selectAllCurrentPreparedRouteMapPoint = createSelector(
    [selectAllMapPoints, selectCurrentPreparedRoute],
    (mapPoints, preparedRoute) => (preparedRoute
        ? preparedRoute.route.mapPoints
            .map((mapPoint) => (mapPoints.find((_mapPoint) => (
                mapPoint.id === _mapPoint.id && mapPoint.category === _mapPoint.properties.category))))
            .filter((mapPoint) => !!mapPoint) as MapPointFeature[]
        : [])
);

export const selectIsPreparedRoutesLoading = (state: RootState) => state.preparedRoutes.isPreparedRoutesLoading;
export const selectIsPreparedRoutesLoadingFailed = (state: RootState) => state.preparedRoutes.isPreparedRoutesLoadingFailed;
export const selectIsCurrenctPreparedRouteLoading = (state: RootState) => state.preparedRoutes.isCurrentPreparedRouteLoading;
export const selectIsCurrenctPreparedRouteLoadingFailed = (state: RootState) => (
    state.preparedRoutes.isCurrentPreparedRouteLoadingFailed
);
