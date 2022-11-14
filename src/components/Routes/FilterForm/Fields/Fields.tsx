import { useTranslation } from "react-i18next";
import { Message } from "semantic-ui-react";

import AdditionalFilters from "@components/Routes/FilterForm/Fields/AdditionalFilters/AdditionalFilters";
import Entrances from "@components/Routes/FilterForm/Fields/Entrances";
import PeopleNumberPicker from "@components/Routes/FilterForm/Fields/PeopleNumberPicker";
import QuickFilters from "@components/Routes/FilterForm/Fields/QuickFilters";
import RouteTimeFields from "@components/Routes/FilterForm/Fields/RouteTimeFields";
import { useAppSelector } from "@store/hooks";
import { selectIsRouteEmpty, selectIsRouteLoadingFailed } from "@store/routes/selectors";

import formStyles from "../styles/FilterForm.module.scss";
import styles from "./styles/Fields.module.scss";

export default function Fields() {
    const { t } = useTranslation("userRoutes");

    const isRouteLoadingFailed = useAppSelector(selectIsRouteLoadingFailed);
    const isRouteEmpty = useAppSelector(selectIsRouteEmpty);

    return (
        <div className={formStyles.fields}>
            <RouteTimeFields />
            <PeopleNumberPicker />
            <Entrances />
            <QuickFilters />
            <AdditionalFilters />
            {(isRouteLoadingFailed || isRouteEmpty) && (
                <div className={styles.messageContainer}>
                    {isRouteLoadingFailed && (
                        <Message
                            visible
                            error
                            className={styles.message}
                            header={t("userRoutes:filterForm.error.title")}
                            content={t("userRoutes:filterForm.error.content")}
                        />
                    )}
                    {isRouteEmpty && (
                        <Message
                            visible
                            warning
                            className={styles.message}
                            header={t("userRoutes:filterForm.empty.title")}
                            content={t("userRoutes:filterForm.empty.content")}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
