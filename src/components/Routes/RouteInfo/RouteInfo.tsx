import { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";

import RouteAdditionalInfo from "@components/RouteAdditional/RouteAdditionalInfo";
import RoutePointsInfo from "@components/RouteAdditional/RoutePointsInfo";
import { MapPointCategory } from "@models/mapPoints/enums";
import { Route } from "@models/userRoutes/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetRoute } from "@store/routes/reducer";
import { selectAllCurrentRouteMapPoint, selectSelectedRoute } from "@store/routes/selectors";

import styles from "./styles/RouteInfo.module.scss";

export default function RouteInfo() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("userRoutes");

    const mapPoints = useAppSelector(selectAllCurrentRouteMapPoint);
    const route = useAppSelector(selectSelectedRoute) as Route;

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
            <RouteAdditionalInfo route={route} />
            <RoutePointsInfo
                mapPoints={mapPoints}
                route={route}
            />
            <div className={styles.buttonContainer}>
                <SecondaryButton
                    className={styles.button}
                    onClick={reset}
                    fluid
                >
                    {t("userRoutes:routeInfo.reset")}
                </SecondaryButton>
                <PrimaryButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://vdnh.ru/route/?path=${placeIds.join(";")}`}
                    fluid
                >
                    {t("userRoutes:routeInfo.edit")}
                </PrimaryButton>
            </div>
        </div>
    );
}
