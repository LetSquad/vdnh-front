import React, { useCallback } from "react";

import { useTranslation } from "react-i18next";
import { generatePath, Link } from "react-router-dom";

import { Locales } from "@coreUtils/localizations/locales_constants";
import { getTimeLocalization } from "@coreUtils/localizations/utils";
import { capitalizeFirstLetter } from "@coreUtils/utils";
import { PreparedRouteInfo } from "@models/preparedRoutes/types";
import { BaseRoutesSlugs } from "@models/routes/enums";
import { useAppDispatch } from "@store/hooks";
import { getPreparedRouteRequest } from "@store/preparedRoutes/reducer";

import styles from "./styles/PreparedRouteInfoBlock.module.scss";

interface PreparedRouteInfoProps {
    info: PreparedRouteInfo;
}

export default function PreparedRouteInfoBlock({ info }: PreparedRouteInfoProps) {
    const dispatch = useAppDispatch();

    const { i18n: { language } } = useTranslation("userRoutes");

    const getRoute = useCallback(() => {
        dispatch(getPreparedRouteRequest({ id: info.id }));
    }, [dispatch, info]);

    return (
        <Link
            to={generatePath(BaseRoutesSlugs.PREPARED_ROUTE, { routeId: info.id.toString() })}
            onClick={getRoute}
            className={styles.container}
        >
            <span className={styles.title}>{info.title[`title${capitalizeFirstLetter(language) as Locales}`]}</span>
            <img
                className={styles.image}
                src={info.previewImageUrl}
                alt="preview"
            />
            <span className={styles.time}>{`~ ${getTimeLocalization(info.duration)}`}</span>
        </Link>
    );
}
