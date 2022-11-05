import React, { useEffect } from "react";

import { Feature, LineString } from "geojson";

import { useMap } from "@components/Map/MapContext";
import FilterForm from "@components/Routes/FilterForm/FilterForm";
import RouteInfo from "@components/Routes/RouteInfo/RouteInfo";
import PreviewRoutes from "@components/Routes/RoutesPreview/PreviewRoutes";
import { useAppSelector } from "@store/hooks";
import { selectReviewRoute, selectSelectedRoute } from "@store/routes/selectors";

export default function RouteMenu() {
    const reviewRoute = useAppSelector(selectReviewRoute);
    const selectedRoute = useAppSelector(selectSelectedRoute);
    const currentRoute = reviewRoute ?? selectedRoute;

    const map = useMap();

    useEffect(() => {
        if (map) {
            const source = map.getSource("route");
            if (source && "setData" in source) {
                const geojson: Feature<LineString> = currentRoute
                    ? {
                        type: "Feature",
                        properties: {},
                        geometry: currentRoute.geometry
                    }
                    : {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: []
                        }
                    };

                source.setData(geojson);
            }
        }
    }, [map, currentRoute]);

    if (!currentRoute) {
        return <FilterForm />;
    }

    if (reviewRoute) {
        return <PreviewRoutes />;
    }

    return <RouteInfo />;
}
