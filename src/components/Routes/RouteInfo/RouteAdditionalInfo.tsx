import { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";

import { useAppSelector } from "@store/hooks";
import { selectSelectedRoute } from "@store/routes/selectors";

import i18n from "@i18n";

import styles from "./styles/RouteAdditionalInfo.module.scss";

export default function RouteAdditionalInfo() {
    const { t } = useTranslation("userRoutes");

    const route = useAppSelector(selectSelectedRoute);

    const distance = useMemo(() => {
        if (!route?.distance) {
            return null;
        }

        if (route.distance < 1000) {
            return i18n.t("userRoutes:routeInfo.distance.meters", { meters: route.distance });
        }

        return i18n.t(
            "userRoutes:routeInfo.distance.kilometers",
            { kilometers: Number.parseFloat((route.distance / 1000).toFixed(1)) }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route?.distance, t]);

    const time = useMemo(() => {
        if (!route?.time) {
            return null;
        }

        const minutesRouteTime = Number.parseInt((route.time / 60).toFixed(0), 10);

        if (minutesRouteTime < 60) {
            return i18n.t("userRoutes:routeInfo.time.minutes", { minutes: minutesRouteTime });
        }

        const hours = Math.trunc(minutesRouteTime / 60);

        return i18n.t(
            "userRoutes:routeInfo.time.total",
            {
                minutes: minutesRouteTime - hours * 60,
                hours: Math.trunc(minutesRouteTime / 60)
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route?.time, t]);

    const info = useCallback((value: string | number, title: string) => (
        <div className={styles.info}>
            <div className={styles.infoValue}>
                {value}
            </div>
            <div className={styles.infoTitle}>
                {title}
            </div>
        </div>
    ), []);

    return (
        <div className={styles.container}>
            {time && info(time, t("userRoutes:routeInfo.time.title"))}
            {distance && info(distance, t("userRoutes:routeInfo.distance.title"))}
            {route && info(route.mapPoints.length, t("userRoutes:routeInfo.points.title", { count: route.mapPoints.length }))}
        </div>
    );
}
