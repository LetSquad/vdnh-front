import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store/index";
import { selectAllMapPoints } from "@store/mapPoints/selectors";

export const selectRoute = (state: RootState) => state.routes.route || [];

export const selectAllRouteMapPoint = createSelector(
    [selectAllMapPoints, selectRoute],
    (mapPoints, route) => (route.length > 0
        ? mapPoints.filter((mapPoint) => (route[0].mapPoints.find((mapPointInfo) => (
            mapPointInfo.id === mapPoint.id && mapPointInfo.category === mapPoint.properties.category))))
        : [])
);

export const selectIsRouteLoading = (state: RootState) => state.routes.isRouteLoading;
export const selectIsRouteLoadingFailed = (state: RootState) => state.routes.isRouteLoadingFailed;
