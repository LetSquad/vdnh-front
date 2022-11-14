import { useCallback, useMemo } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useMap } from "@components/Map/MapContext";
import { Locales } from "@coreUtils/localizations/locales_constants";
import { getDistanceLocalization, getTimeLocalization } from "@coreUtils/localizations/utils";
import { capitalizeFirstLetter } from "@coreUtils/utils";
import { MapPointCategory } from "@models/mapPoints/enums";
import { MapPointFeature, MapPointTimeInfo } from "@models/mapPoints/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import ReadMore from "@parts/ReadMore/ReadMore";
import distanceRoute from "@static/images/svg/distance-route.svg";
import { useAppSelector } from "@store/hooks";
import { selectSelectedRoute } from "@store/routes/selectors";

import styles from "./styles/RoutePointInfo.module.scss";

interface RoutePointInfoProps {
    order: number;
    mapPoint: MapPointFeature;
    mapPointTimeInfo?: MapPointTimeInfo;
}

export default function RoutePointInfo({ order, mapPoint, mapPointTimeInfo }: RoutePointInfoProps) {
    const { t, i18n: { language } } = useTranslation(["base", "userRoutes"]);

    const route = useAppSelector(selectSelectedRoute);

    const map = useMap();

    const onOrderClick = useCallback(() => {
        map?.flyTo({
            center: [mapPoint.geometry.coordinates[0], mapPoint.geometry.coordinates[1]],
            zoom: 16
        });
    }, [map, mapPoint.geometry.coordinates]);

    const ticketUrl = useMemo(() => (
        mapPoint.properties.category === MapPointCategory.PLACE && mapPoint.properties.ticketsUrl
    ), [mapPoint.properties]);

    const visitTime = useMemo(() => {
        if (mapPoint.properties.category === MapPointCategory.PLACE && mapPoint.properties.visitTime) {
            return t("userRoutes:routeInfo.pointInfo.visitTime", { totalTime: getTimeLocalization(mapPoint.properties.visitTime) });
        }

        return undefined;
    }, [mapPoint.properties, t]);

    const transitionInfo = useMemo(() => {
        if (mapPointTimeInfo?.time && mapPointTimeInfo.distance) {
            return `${getTimeLocalization(mapPointTimeInfo.time)}, ${getDistanceLocalization(mapPointTimeInfo.distance)}`;
        }

        if (mapPointTimeInfo?.time && !mapPointTimeInfo.distance) {
            return `${getTimeLocalization(mapPointTimeInfo.time)}`;
        }

        if (mapPointTimeInfo?.distance && !mapPointTimeInfo.time) {
            return `${getTimeLocalization(mapPointTimeInfo.distance)}`;
        }

        return undefined;
    }, [mapPointTimeInfo]);

    const mapPointDescription = useMemo(() => route
        ?.mapPoints
        ?.find((_mapPoint) => _mapPoint.id === mapPoint.id)
        ?.description
        ?.[`description${capitalizeFirstLetter(language) as Locales}`], [language, mapPoint.id, route?.mapPoints]);

    return (
        <>
            <div className={styles.container}>
                <div
                    aria-hidden
                    onClick={onOrderClick}
                    className={styles.order}
                    data-num={order}
                />
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={mapPoint.properties.url}
                    className={styles.pointInfo}
                >
                    <div className={styles.pointInfoContainer}>
                        <span className={styles.type}>{mapPoint.properties.localizedType}</span>
                        <span
                            className={classNames({
                                [styles.title]: visitTime || (!visitTime && !ticketUrl),
                                [styles.titleWithMargin]: !visitTime && ticketUrl
                            })}
                        >
                            {mapPoint.properties.localizedTitle}
                        </span>
                        {visitTime && (
                            <span
                                className={classNames({
                                    [styles.visitTime]: !ticketUrl,
                                    [styles.visitTimeWithMargin]: ticketUrl
                                })}
                            >
                                {visitTime}
                            </span>
                        )}
                        {ticketUrl && (
                            <PrimaryButton
                                target="_blank"
                                rel="noopener noreferrer"
                                href={ticketUrl}
                                fluid
                            >
                                {t("base:buyTicket")}
                            </PrimaryButton>
                        )}
                    </div>
                    <img
                        className={styles.pic}
                        src={mapPoint.properties.pic}
                        alt={mapPoint.properties.localizedTitle || ""}
                    />
                </a>
                {mapPointDescription && (
                    <div className={styles.description}>
                        <ReadMore text={mapPointDescription} />
                    </div>
                )}
            </div>
            {transitionInfo && (
                <div className={styles.transition}>
                    <img
                        src={distanceRoute}
                        alt="transition"
                    />
                    {transitionInfo}
                </div>
            )}
        </>
    );
}
