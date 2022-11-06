import { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";

import RoutePointInfo from "@components/Routes/RouteInfo/RoutePointInfo";
import { MapPointCategory } from "@models/mapPoints/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetRoute } from "@store/routes/reducer";
import { selectAllCurrentRouteMapPoint } from "@store/routes/selectors";

import styles from "./styles/RouteInfo.module.scss";

export default function RouteInfo() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("userRoutes");

    const mapPoints = useAppSelector(selectAllCurrentRouteMapPoint);

    const reset = useCallback(() => {
        dispatch(resetRoute());
    }, [dispatch]);

    const placeIds: number[] = useMemo(
        () => mapPoints.map(
            (mapPoint) => (
                mapPoint.properties.category === MapPointCategory.EVENT && mapPoint.properties.places.length > 0
                    ? mapPoint.properties.places[0]
                    : mapPoint.id
            )
        ),
        [mapPoints]
    );

    return (
        <div className={styles.container}>
            {mapPoints.map((mapPoint, i) => (
                <RoutePointInfo
                    order={i + 1}
                    key={mapPoint.id}
                    mapPoint={mapPoint}
                />
            ))}
            <div className={styles.buttonContainer}>
                <SecondaryButton
                    className={styles.button}
                    onClick={reset}
                >
                    {t("userRoutes:routeInfo.reset")}
                </SecondaryButton>
                <PrimaryButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://vdnh.ru/route/?path=${placeIds.join(";")}`}
                >
                    {t("userRoutes:routeInfo.edit")}
                </PrimaryButton>
            </div>
        </div>
    );
}
