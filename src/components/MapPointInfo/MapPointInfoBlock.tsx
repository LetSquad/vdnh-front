import { useCallback } from "react";

import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import MapPointInfo from "@components/MapPointInfo/MapPointInfo";
import { MapPointCategory } from "@models/mapPoints/enums";
import { MapPointFeature, PlaceFeature } from "@models/mapPoints/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setMapPointsUnActive } from "@store/mapPoints/reducer";
import { selectAllEventsForPlace } from "@store/mapPoints/selectors";

import styles from "./styles/MapPointInfoBlock.module.scss";

interface MapPointInfoProps {
    mapPoint: MapPointFeature;
}

export default function MapPointInfoBlock({ mapPoint }: MapPointInfoProps) {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("routes");

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
            <h3>{mapPoint.properties.localizedTitle}</h3>
            <div className={styles.placeInfo}>
                {
                    mapPoint.properties.pic
                        ? (
                            <div>
                                <img
                                    className={styles.pic}
                                    src={mapPoint.properties.pic}
                                    alt={mapPoint.properties.localizedTitle || ""}
                                />
                            </div>
                        ) : null
                }
                <div className={styles.buttonGroup}>
                    <PrimaryButton
                        target="_blank"
                        rel="noopener noreferrer"
                        href={mapPoint.properties.url}
                    >
                        {t("map:place.additionalInfo")}
                    </PrimaryButton>
                    {
                        mapPoint.properties.category === MapPointCategory.PLACE && mapPoint.properties.ticketsUrl
                            ? (
                                <SecondaryButton
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={mapPoint.properties.ticketsUrl}
                                >
                                    {t("map:place.tickets")}
                                </SecondaryButton>
                            ) : null
                    }
                </div>
            </div>
            {
                mapPoint.properties.category === MapPointCategory.PLACE && mapPoint.properties.scheduleClosingTime
                    ? (
                        <div>
                            <b>
                                {`${t("map:place.closingTime")} ${mapPoint.properties.scheduleClosingTime}`}
                            </b>
                        </div>
                    ) : null
            }
            {
                mapPoint.properties.category === MapPointCategory.PLACE && !mapPoint.properties.scheduleClosingTime &&
                mapPoint.properties.scheduleDayOff === true
                    ? (
                        <div>
                            <b>
                                {t("map:place.dayOff")}
                            </b>
                        </div>
                    ) : null
            }
            {
                eventPlaces.length > 0
                    ? (
                        <>
                            <h4>{t("map:place.events")}</h4>
                            <hr />
                            <div className={styles.eventsList}>
                                <ul>
                                    {eventPlaces.map((eventPlace) => (
                                        <MapPointInfo
                                            mapPoint={eventPlace}
                                            key={eventPlace.id}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : null
            }
        </div>
    );
}
