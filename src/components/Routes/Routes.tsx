import React, { lazy, useCallback, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";

import RouteMenu from "@components/Routes/RouteMenu";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { selectPlacesAndStandaloneEvents } from "@store/mapPoints/selectors";
import { resetRoute } from "@store/routes/reducer";
import { selectAllCurrentRouteMapPoint, selectCurrentRoute } from "@store/routes/selectors";

import styles from "./styles/Routes.module.scss";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function Routes() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("userRoutes");

    const mapPoints = useAppSelector(selectPlacesAndStandaloneEvents);
    const route = useAppSelector(selectCurrentRoute);
    const routeWaypoint = useAppSelector(selectAllCurrentRouteMapPoint);

    const [isMenuOpen, , openMenu, closeMenu] = useToggle(true);

    const reset = useCallback(() => {
        dispatch(resetRoute());
    }, [dispatch]);

    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
        return () => reset();
    }, [reset]);

    return (
        <div className={basePartStyles.baseContainer}>
            <WithSuspense>
                <Map mapPoints={route ? routeWaypoint : mapPoints}>
                    {
                        isMenuOpen
                            ? (
                                <div className={styles.container}>
                                    <Icon
                                        className={styles.closeIcon}
                                        name="remove"
                                        link
                                        onClick={closeMenu}
                                        size="large"
                                    />
                                    <RouteMenu />
                                </div>
                            )
                            : (
                                <PrimaryButton
                                    onClick={openMenu}
                                    className={styles.filterButton}
                                >
                                    {route
                                        ? t("userRoutes:routeButton")
                                        : t("userRoutes:filterButton")}
                                </PrimaryButton>
                            )
                    }
                </Map>
            </WithSuspense>
        </div>
    );
}
