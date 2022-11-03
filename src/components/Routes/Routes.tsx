import React, { lazy } from "react";

import { useTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";

import RouteMenu from "@components/Routes/RouteMenu";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppSelector } from "@store/hooks";
import { selectAllMapPoints } from "@store/mapPoints/selectors";
import { selectAllRouteMapPoint, selectRoute } from "@store/routes/selectors";

import styles from "./styles/Routes.module.scss";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function Routes() {
    const { t } = useTranslation("userRoutes");

    const mapPoints = useAppSelector(selectAllMapPoints);
    const route = useAppSelector(selectRoute);
    const routeWaypoint = useAppSelector(selectAllRouteMapPoint);

    const [isMenuOpen, , openMenu, closeMenu] = useToggle(true);

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
