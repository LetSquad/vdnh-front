import { useMemo } from "react";

import classNames from "classnames";

import RoutePointInfo from "@components/RouteAdditional/RoutePointInfo";
import { MapPointFeature } from "@models/mapPoints/types";
import { Route } from "@models/userRoutes/types";

import styles from "./styles/RoutePointsInfo.module.scss";

interface RoutePointsInfoProps {
    mapPoints: MapPointFeature[];
    route: Route;
    withOverflow?: boolean;
    withPadding?: boolean;
}

export default function RoutePointsInfo({
    mapPoints, route, withOverflow = true, withPadding = false
}: RoutePointsInfoProps) {
    return useMemo(() => (
        <div
            className={classNames({
                [styles.containerWithOverflow]: withOverflow,
                [styles.container]: !withOverflow && !withPadding,
                [styles.containerWithPadding]: withPadding
            })}
        >
            {
                mapPoints.map((mapPoint, i) => {
                    const mapPointTimeInfo = i < mapPoints.length - 1
                        ? route?.mapPointTimes?.[i]
                        : undefined;
                    return (
                        <RoutePointInfo
                            order={i + 1}
                            key={mapPoint.id}
                            mapPoint={mapPoint}
                            mapPointTimeInfo={mapPointTimeInfo}
                            route={route}
                        />
                    );
                })
            }
        </div>
    ), [mapPoints, route, withOverflow, withPadding]);
}
