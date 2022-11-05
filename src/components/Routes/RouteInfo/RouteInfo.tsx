import { useCallback } from "react";

import { useTranslation } from "react-i18next";

import MapPointInfo from "@components/MapPointInfo/MapPointInfo";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetRoute } from "@store/routes/reducer";
import { selectAllSelectedRouteMapPoint } from "@store/routes/selectors";

import styles from "./RouteInfo.module.scss";

export default function RouteInfo() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("userRoutes");

    const mapPoints = useAppSelector(selectAllSelectedRouteMapPoint);

    const reset = useCallback(() => {
        dispatch(resetRoute());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {mapPoints.map((mapPoint) => (
                <MapPointInfo
                    key={mapPoint.id}
                    mapPoint={mapPoint}
                />
            ))}
            <SecondaryButton
                className={styles.button}
                onClick={reset}
            >
                {t("userRoutes:routeInfo.reset")}
            </SecondaryButton>
        </div>
    );
}
