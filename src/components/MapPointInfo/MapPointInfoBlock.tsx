import { useCallback } from "react";

import { useSearchParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import MapPointInfo from "@components/MapPointInfo/MapPointInfo";
import { MapPointCategory } from "@models/mapPoints/enums";
import { MapPointFeature, PlaceFeature } from "@models/mapPoints/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setMapPointsUnActive } from "@store/mapPoints/reducer";
import { selectAllEventsForPlace } from "@store/mapPoints/selectors";

import styles from "./styles/MapPointInfoBlock.module.scss";

interface MapPointInfoProps {
    mapPoint: MapPointFeature;
}

export default function MapPointInfoBlock({ mapPoint }: MapPointInfoProps) {
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const eventPlaces = useAppSelector((state) => selectAllEventsForPlace(
        state,
        mapPoint.properties.category === MapPointCategory.PLACE ? mapPoint as PlaceFeature : undefined
    ));

    const onClose = useCallback(() => {
        for (const key of searchParams.keys()) {
            searchParams.delete(key);
        }

        setSearchParams(searchParams);
        dispatch(setMapPointsUnActive());
    }, [dispatch, searchParams, setSearchParams]);

    return (
        <div className={styles.container}>
            <Icon
                name="remove"
                link
                onClick={onClose}
                className={styles.closeIcon}
            />
            {
                eventPlaces.length > 0
                    ? eventPlaces.map((eventPlace) => (
                        <MapPointInfo
                            mapPoint={eventPlace}
                            key={eventPlace.id}
                        />
                    ))
                    : <MapPointInfo mapPoint={mapPoint} />
            }
        </div>
    );
}
