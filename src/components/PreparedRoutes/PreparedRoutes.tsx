import React, { useCallback, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Loader } from "semantic-ui-react";

import PreparedRouteInfoBlock from "@components/PreparedRoutes/PreparedRouteInfoBlock";
import basePartStyles from "@coreStyles/baseParts.module.scss";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPreparedRoutesRequest } from "@store/preparedRoutes/reducer";
import { selectIsPreparedRoutesLoading, selectIsPreparedRoutesLoadingFailed, selectPreparedRoutes } from "@store/preparedRoutes/selectors";

import styles from "./styles/PreparedRoutes.module.scss";

export default function PreparedRoutes() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("preparedRoutes");

    const preparedRoutesInfo = useAppSelector(selectPreparedRoutes);
    const isPreparedRoutesLoading = useAppSelector(selectIsPreparedRoutesLoading);
    const isPreparedRoutesLoadingFailed = useAppSelector(selectIsPreparedRoutesLoadingFailed);

    const getRoutes = useCallback(() => {
        dispatch(getPreparedRoutesRequest());
    }, [dispatch]);

    useEffect(() => {
        getRoutes();
    }, [getRoutes]);

    if (isPreparedRoutesLoading) {
        return (
            <div className={basePartStyles.flexBaseCenterContainer}>
                <Loader
                    active
                    inline="centered"
                />
            </div>
        );
    }

    if (isPreparedRoutesLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText={t("preparedRoutes:preparedRoutes.loadingError")}
                reload={getRoutes}
            />
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h1 className={styles.title}>{t("preparedRoutes:preparedRoutes.title")}</h1>
                <div className={styles.description}>{t("preparedRoutes:preparedRoutes.description")}</div>
            </div>
            <div className={styles.routesContainer}>
                {preparedRoutesInfo.map((preparedRouteInfo) => (
                    <PreparedRouteInfoBlock
                        key={preparedRouteInfo.id}
                        info={preparedRouteInfo}
                    />
                ))}
            </div>
        </div>
    );
}
