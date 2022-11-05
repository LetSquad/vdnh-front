import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store/index";
import { selectAllMapPoints } from "@store/mapPoints/selectors";

export const selectRoutes = (state: RootState) => state.routes.routes || [];
export const selectReviewRoute = (state: RootState) => state.routes.reviewRoute;
export const selectSelectedRoute = (state: RootState) => state.routes.selectedRoute;

export const selectCurrentRoute = createSelector(
    [selectReviewRoute, selectSelectedRoute],
    (reviewRoute, selectedRoute) => reviewRoute ?? selectedRoute
);

export const selectAllSelectedRouteMapPoint = createSelector(
    [selectAllMapPoints, selectSelectedRoute],
    (mapPoints, route) => (route
        ? mapPoints.filter((mapPoint) => (route.mapPoints.find((mapPointInfo) => (
            mapPointInfo.id === mapPoint.id && mapPointInfo.category === mapPoint.properties.category))))
        : [])
);

export const selectIsRouteLoading = (state: RootState) => state.routes.isRouteLoading;
export const selectIsRouteLoadingFailed = (state: RootState) => state.routes.isRouteLoadingFailed;
export const selectIsRouteEmpty = (state: RootState) => state.routes.isRouteEmpty;
