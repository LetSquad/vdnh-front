import React, { useEffect } from "react";

import { Feature, LineString } from "geojson";
import { useTranslation } from "react-i18next";

import { useMap } from "@components/Map/MapContext";
import Entrances from "@components/PreparedRoutes/Entrances";
import RouteAdditionalInfo from "@components/RouteAdditional/RouteAdditionalInfo";
import RoutePointsInfo from "@components/RouteAdditional/RoutePointsInfo";
import { Locales } from "@coreUtils/localizations/locales_constants";
import { capitalizeFirstLetter } from "@coreUtils/utils";
import { PreparedRoute } from "@models/preparedRoutes/types";
import { useAppSelector } from "@store/hooks";
import { selectAllCurrentPreparedRouteMapPoint, selectCurrentPreparedRoute } from "@store/preparedRoutes/selectors";

import styles from "./styles/PreparedRouteInfo.module.scss";

export default function PreparedRouteInfo() {
    const { i18n: { language } } = useTranslation("preparedRoutes");

    const mapPoints = useAppSelector(selectAllCurrentPreparedRouteMapPoint);
    const route = useAppSelector(selectCurrentPreparedRoute) as PreparedRoute;

    const map = useMap();

    useEffect(() => {
        if (map) {
            const source = map.getSource("route");
            if (source && "setData" in source) {
                const geojson: Feature<LineString> = route?.route
                    ? {
                        type: "Feature",
                        properties: {},
                        geometry: route.route.geometry
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

    return (
        <>
            <img
                className={styles.image}
                src={route.imageUrl}
                alt="preview"
            />
            <div className={styles.container}>
                <div>
                    <h1 className={styles.title}>{route.title[`title${capitalizeFirstLetter(language) as Locales}`]}</h1>
                    <span className={styles.description}>
                        {route.description[`description${capitalizeFirstLetter(language) as Locales}`]}
                    </span>
                </div>
                <RouteAdditionalInfo route={route.route} />
                <Entrances />
                <RoutePointsInfo
                    withOverflow={false}
                    mapPoints={mapPoints}
                    route={route.route}
                />
            </div>
        </>
    );
}
