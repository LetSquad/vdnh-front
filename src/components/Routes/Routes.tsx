import { lazy } from "react";

import RouteMenu from "@components/Routes/RouteMenu";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useAppSelector } from "@store/hooks";
import { selectAllMapPoints } from "@store/mapPoints/selectors";
import { selectAllRouteMapPoint, selectRoute } from "@store/routes/selectors";

import styles from "./styles/Routes.module.scss";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function Routes() {
    const mapPoints = useAppSelector(selectAllMapPoints);
    const route = useAppSelector(selectRoute);
    const routeWaypoint = useAppSelector(selectAllRouteMapPoint);

    return (
        <div className={basePartStyles.baseContainer}>
            <WithSuspense>
                <Map mapPoints={route ? routeWaypoint : mapPoints}>
                    <div className={styles.container}>
                        <RouteMenu />
                    </div>
                </Map>
            </WithSuspense>
        </div>
    );
}
