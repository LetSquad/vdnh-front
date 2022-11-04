import { lazy } from "react";

import MapPointInfo from "@components/MapPointInfo/MapPointInfo";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useAppSelector } from "@store/hooks";
import { selectCurrentMapPoint, selectEvents } from "@store/mapPoints/selectors";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function Events() {
    const places = useAppSelector(selectEvents);
    const currentMapPoint = useAppSelector(selectCurrentMapPoint);

    return (
        <div className={basePartStyles.baseContainer}>
            <WithSuspense>
                <Map mapPoints={places}>
                    {currentMapPoint && <MapPointInfo mapPoint={currentMapPoint} />}
                </Map>
            </WithSuspense>
        </div>
    );
}
