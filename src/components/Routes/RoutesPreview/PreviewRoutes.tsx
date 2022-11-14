import { useCallback } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { getDistanceLocalization, getTimeLocalization } from "@coreUtils/localizations/utils";
import { Route } from "@models/userRoutes/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import distanceIcon from "@static/images/svg/distance.svg";
import timeIcon from "@static/images/svg/time.svg";
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

    return (
        <div className={styles.container}>
            {routes.map((route, index) => (
                <div
                    key={route.id}
                    aria-hidden
                    onClick={() => onChangeRoute(route)}
                    className={classNames(styles.route, { [styles.routeActive]: reviewRoute?.id === route.id })}
                >
                    <span className={styles.routeTitle}>{t("userRoutes:routesPreview.text", { count: index + 1 })}</span>
                    <div className={styles.routeInfoContainer}>
                        <div>
                            <img
                                className={styles.routeInfoIcon}
                                src={distanceIcon}
                                alt="distance"
                            />
                            {getDistanceLocalization(route.distance) && (
                                <span className={styles.routeInfo}>
                                    {getDistanceLocalization(route.distance)}
                                </span>
                            )}
                        </div>
                        <div>
                            <img
                                className={styles.routeInfoIcon}
                                src={timeIcon}
                                alt="time"
                            />
                            {getTimeLocalization(route.time) && (
                                <span className={styles.routeInfo}>
                                    {getTimeLocalization(route.time)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <div className={styles.buttonContainer}>
                <SecondaryButton
                    onClick={reset}
                    fluid
                >
                    {t("userRoutes:routeInfo.reset")}
                </SecondaryButton>
                <PrimaryButton
                    onClick={onSelectRoute}
                    fluid
                >
                    {t("userRoutes:routesPreview.select")}
                </PrimaryButton>
            </div>
        </div>
    );
}
