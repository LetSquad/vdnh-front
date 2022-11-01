import { lazy } from "react";

import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useAppSelector } from "@store/hooks";
import { selectPlaces } from "@store/places/selectors";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function Places() {
    const places = useAppSelector(selectPlaces);

    return (
        <div className={basePartStyles.baseContainer}>
            <WithSuspense>
                <Map places={places} />
            </WithSuspense>
        </div>
    );
}
