import { useCallback } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Route } from "@models/userRoutes/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { changeReviewRoute, resetRoute, selectRoute } from "@store/routes/reducer";
import { selectReviewRoute, selectRoutes } from "@store/routes/selectors";

import styles from "./styles/PreviewRoutes.module.scss";

export default function PreviewRoutes() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("userRoutes");

    const routes = useAppSelector(selectRoutes);
    const reviewRoute = useAppSelector(selectReviewRoute);

    const onChangeRoute = useCallback((route: Route) => {
        dispatch(changeReviewRoute(route));
    }, [dispatch]);

    const onSelectRoute = useCallback(() => {
        dispatch(selectRoute());
    }, [dispatch]);

    const reset = useCallback(() => {
        dispatch(resetRoute());
    }, [dispatch]);

    const distance = useCallback((route: Route) => {
        if (!route.distance) {
            return null;
        }

        if (route.distance < 1000) {
            return t("userRoutes:routesPreview.distance.short", { count: route.distance });
        }

        return t(
            "userRoutes:routesPreview.distance.long",
            {
                distance: Number.parseFloat((route.distance / 1000).toFixed(1)),
                count: Math.trunc(route.distance / 1000)
            }
        );
    }, [t]);

    return (
        <div className={styles.container}>
            {routes.map((route, index) => (
                <div
                    key={route.id}
                    aria-hidden
                    onClick={() => onChangeRoute(route)}
                    className={classNames(styles.route, { [styles.routeActive]: reviewRoute?.id === route.id })}
                >
                    <span>{t("userRoutes:routesPreview.text", { count: index + 1 })}</span>
                    {distance(route) && <span>{distance(route)}</span>}
                </div>
            ))}
            <div className={styles.buttonContainer}>
                <SecondaryButton onClick={reset}>
                    {t("userRoutes:routeInfo.reset")}
                </SecondaryButton>
                <PrimaryButton onClick={onSelectRoute}>
                    {t("userRoutes:routesPreview.select")}
                </PrimaryButton>
            </div>
        </div>
    );
}
