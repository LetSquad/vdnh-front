import React, { useEffect } from "react";

import { Feature, LineString } from "geojson";

import { useMap } from "@components/Map/MapContext";
import FilterForm from "@components/Routes/FilterForm/FilterForm";
import RouteInfo from "@components/Routes/RouteInfo/RouteInfo";
import { useAppSelector } from "@store/hooks";
import { selectRoute } from "@store/routes/selectors";

export default function RouteMenu() {
    const route = useAppSelector(selectRoute);

    const map = useMap();

    useEffect(() => {
        if (map) {
            const source = map.getSource("route");
            if (source && "setData" in source) {
                const geojson: Feature<LineString> = route
                    ? {
                        type: "Feature",
                        properties: {},
                        geometry: route[0].geometry
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
    }, [map, route]);

    return !route ? <FilterForm /> : <RouteInfo />;
}
