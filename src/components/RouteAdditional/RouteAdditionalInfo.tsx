import { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";

import { Route } from "@models/userRoutes/types";

import styles from "./styles/RouteAdditionalInfo.module.scss";

interface RouteAdditionalInfoProps {
    route: Route;
}

export default function RouteAdditionalInfo({ route }: RouteAdditionalInfoProps) {
    const { t } = useTranslation("userRoutes");

    const distance = useMemo(() => {
        if (!route?.distance) {
            return null;
        }

        if (route.distance < 1000) {
            return t("userRoutes:routeInfo.distance.meters", { meters: Number.parseInt(route.distance.toFixed(0), 10) });
        }

        return t(
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
            return t("userRoutes:routeInfo.time.minutes", { minutes: minutesRouteTime });
        }

        const hours = Math.trunc(minutesRouteTime / 60);
        const minutes = minutesRouteTime - hours * 60;

        if (minutes === 0) {
            return t("userRoutes:routeInfo.time.hours", { hours });
        }

        return t(
            "userRoutes:routeInfo.time.total",
            {
                minutes,
                hours
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
