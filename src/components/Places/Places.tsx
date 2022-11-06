import React, { lazy } from "react";

import { useTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";

import MapPointInfoBlock from "@components/MapPointInfo/MapPointInfoBlock";
import PlaceFilter from "@components/Places/PlaceFilter";
import styles from "@components/Places/styles/Places.module.scss";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppSelector } from "@store/hooks";
import { selectCurrentPlace, selectPlaces } from "@store/mapPoints/selectors";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function Places() {
    const { t } = useTranslation("userRoutes");

    const places = useAppSelector(selectPlaces);
    const currentPlace = useAppSelector(selectCurrentPlace);

    const [isMenuOpen, , openMenu, closeMenu] = useToggle(false);

    return (
        <div className={basePartStyles.baseContainer}>
            <WithSuspense>
                <Map mapPoints={places}>
                    <>
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
                                        <PlaceFilter />
                                    </div>
                                )
                                : (
                                    <PrimaryButton
                                        onClick={openMenu}
                                        className={styles.filterButton}
                                    >
                                        {t("userRoutes:filterButton")}
                                    </PrimaryButton>
                                )
                        }
                        {currentPlace && <MapPointInfoBlock mapPoint={currentPlace} />}
                    </>
                </Map>
            </WithSuspense>
        </div>
    );
}
