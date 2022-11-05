import { lazy } from "react";

import MapPointInfoBlock from "@components/MapPointInfo/MapPointInfoBlock";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useAppSelector } from "@store/hooks";
import { selectCurrentMapPoint, selectPlaceAndStandaloneEvents } from "@store/mapPoints/selectors";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function Events() {
    const places = useAppSelector(selectPlaceAndStandaloneEvents);
    const currentMapPoint = useAppSelector(selectCurrentMapPoint);

    return (
        <div className={basePartStyles.baseContainer}>
            <WithSuspense>
                <Map mapPoints={places}>
                    {currentMapPoint && <MapPointInfoBlock mapPoint={currentMapPoint} />}
                </Map>
            </WithSuspense>
        </div>
    );
}
