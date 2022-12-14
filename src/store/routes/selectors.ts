import { createSelector } from "@reduxjs/toolkit";

import { MapPointFeature } from "@models/mapPoints/types";
import { RootState } from "@store/index";
import { selectAllMapPoints } from "@store/mapPoints/selectors";

export const selectRoutes = (state: RootState) => state.routes.routes || [];
export const selectReviewRoute = (state: RootState) => state.routes.reviewRoute;
export const selectSelectedRoute = (state: RootState) => state.routes.selectedRoute;

export const selectCurrentRoute = createSelector(
    [selectReviewRoute, selectSelectedRoute],
    (reviewRoute, selectedRoute) => reviewRoute ?? selectedRoute
);

export const selectAllCurrentRouteMapPoint = createSelector(
    [selectAllMapPoints, selectCurrentRoute],
    (mapPoints, route) => (route
        ? route.mapPoints
            .map((mapPoint) => (mapPoints.find((_mapPoint) => (
                mapPoint.id === _mapPoint.id && mapPoint.category === _mapPoint.properties.category))))
            .filter((mapPoint) => !!mapPoint) as MapPointFeature[]
        : [])
);

export const selectIsRouteLoading = (state: RootState) => state.routes.isRouteLoading;
export const selectIsRouteLoadingFailed = (state: RootState) => state.routes.isRouteLoadingFailed;
export const selectIsRouteEmpty = (state: RootState) => state.routes.isRouteEmpty;
