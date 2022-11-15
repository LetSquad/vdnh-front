import { useMemo } from "react";

import RoutePointInfo from "@components/Routes/RouteInfo/RoutePointInfo";
import { useAppSelector } from "@store/hooks";
import { selectAllCurrentRouteMapPoint, selectSelectedRoute } from "@store/routes/selectors";

import styles from "./styles/RoutePointsInfo.module.scss";

export default function RoutePointsInfo() {
    const mapPoints = useAppSelector(selectAllCurrentRouteMapPoint);
    const route = useAppSelector(selectSelectedRoute);

    return useMemo(() => (
        <div className={styles.container}>
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
                        />
                    );
                })
            }
        </div>
    ), [mapPoints, route?.mapPointTimes]);
}
