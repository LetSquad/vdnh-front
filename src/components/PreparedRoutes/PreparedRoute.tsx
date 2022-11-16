import React, { lazy, useCallback, useEffect } from "react";

import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
    redirect,
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";
import { Icon, Loader } from "semantic-ui-react";

import PreparedRouteInfo from "@components/PreparedRoutes/PreparedRouteInfo";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import { PreparedRouteRequestData } from "@models/preparedRoutes/types";
import { BaseRoutesSlugs } from "@models/routes/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPreparedRouteRequest, resetCurrentRoute } from "@store/preparedRoutes/reducer";
import { selectAllCurrentPreparedRouteMapPoint, selectIsCurrenctPreparedRouteLoading, selectIsCurrenctPreparedRouteLoadingFailed } from "@store/preparedRoutes/selectors";

import styles from "./styles/PreparedRoute.module.scss";

const Map = lazy(/* webpackChunkName: "Map" */ () => import("@components/Map/Map"));

export default function PreparedRoute() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation("preparedRoutes");

    const { routeId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const mapPoints = useAppSelector(selectAllCurrentPreparedRouteMapPoint);
    const isCurrentPreparedRouteLoading = useAppSelector(selectIsCurrenctPreparedRouteLoading);
    const isCurrentPreparedRouteLoadingFailed = useAppSelector(selectIsCurrenctPreparedRouteLoadingFailed);

    const [isMenuOpen, , openMenu, closeMenu] = useToggle(true);

    const moveToRoutes = useCallback(() => {
        dispatch(resetCurrentRoute());
        navigate(BaseRoutesSlugs.PREPARED_ROUTES);
    }, [dispatch, navigate]);

    const getRoute = useCallback(() => {
        if (isCurrentPreparedRouteLoading) {
            return;
        }

        if (typeof routeId !== "string" || Number.isNaN(routeId)) {
            toast.error(t(
                "preparedRoutes:preparedRoute.incorrectIdError",
                `Маршрута с id ${routeId} не существует. Выберете, пожалуйста другой маршрут`
            ) as string);
            redirect(BaseRoutesSlugs.PREPARED_ROUTES);
        }

        const requestData: PreparedRouteRequestData = {
            id: Number.parseInt(routeId as string, 10),
            entrance: undefined,
            exit: undefined
        };

        if (searchParams.get("entrance")) {
            const entrance = searchParams.get("entrance");
            if (Number.isNaN(entrance)) {
                requestData.entrance = Number.parseInt(entrance as string, 10);
            } else {
                searchParams.delete("entrance");
            }
        }

        if (searchParams.get("exit")) {
            const exit = searchParams.get("exit");
            if (Number.isNaN(exit)) {
                requestData.exit = Number.parseInt(exit as string, 10);
            } else {
                searchParams.delete("exit");
            }
        }

        setSearchParams(searchParams);

        dispatch(getPreparedRouteRequest(requestData));
    }, [dispatch, isCurrentPreparedRouteLoading, routeId, searchParams, setSearchParams, t]);

    useEffect(() => {
        getRoute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isCurrentPreparedRouteLoading) {
        return (
            <div className={basePartStyles.flexBaseCenterContainer}>
                <Loader
                    active
                    inline="centered"
                />
            </div>
        );
    }

    if (isCurrentPreparedRouteLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText={t("preparedRoutes:preparedRoute.loadingError")}
                reload={getRoute}
            />
        );
    }

    return (
        <div className={basePartStyles.baseContainer}>
            <WithSuspense>
                <Map mapPoints={mapPoints}>
                    {
                        isMenuOpen
                            ? (
                                <div className={styles.container}>
                                    <Icon
                                        className={styles.arrowIcon}
                                        name="arrow left"
                                        link
                                        onClick={moveToRoutes}
                                        size="large"
                                    />
                                    <Icon
                                        className={styles.closeIcon}
                                        name="remove"
                                        link
                                        onClick={closeMenu}
                                        size="large"
                                    />
                                    <PreparedRouteInfo />
                                </div>
                            )
                            : (
                                <PrimaryButton
                                    onClick={openMenu}
                                    className={styles.openButton}
                                >
                                    {t("userRoutes:routeButton")}
                                </PrimaryButton>
                            )
                    }
                </Map>
            </WithSuspense>
        </div>
    );
}
