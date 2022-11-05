import { lazy } from "react";

import MapPointInfoBlock from "@components/MapPointInfo/MapPointInfoBlock";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useAppSelector } from "@store/hooks";
import { selectCurrentPlace, selectPlaces } from "@store/mapPoints/selectors";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function Places() {
    const places = useAppSelector(selectPlaces);
    const currentPlace = useAppSelector(selectCurrentPlace);

    return (
        <div className={basePartStyles.baseContainer}>
            <WithSuspense>
                <Map mapPoints={places}>
                    {currentPlace && <MapPointInfoBlock mapPoint={currentPlace} />}
                </Map>
            </WithSuspense>
        </div>
    );
}
