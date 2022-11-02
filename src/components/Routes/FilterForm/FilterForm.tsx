import { useCallback, useMemo } from "react";

import { FormikProvider, useFormik } from "formik";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { Form } from "semantic-ui-react";

import PeopleNumberPicker from "@components/Routes/FilterForm/PeopleNumberPicker";
import QuickFilters from "@components/Routes/FilterForm/QuickFilters";
import RouteTimeFields from "@components/Routes/FilterForm/RouteTimeFields";
import { roundTimeToMinutes } from "@coreUtils/utils";
import {
    Difficulty,
    Popularity,
    RouteFiltersFieldsName,
    RouteFiltersPeopleNumberFieldsName
} from "@models/userRoutes/enums";
import { RouteFiltersFormValues } from "@models/userRoutes/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getRouteRequest } from "@store/routes/reducer";
import { selectIsRouteLoading, selectIsRouteLoadingFailed } from "@store/routes/selectors";

import styles from "./styles/FilterForm.module.scss";

export default function FilterForm() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("userRoutes");

    const isRouteLoading = useAppSelector(selectIsRouteLoading);
    const isRouteLoadingFailed = useAppSelector(selectIsRouteLoadingFailed);

    const initialValues = useMemo(() => {
        const roundedNow = roundTimeToMinutes(DateTime.now(), 30);

        return {
            [RouteFiltersFieldsName.DATE_TIME_START]: roundedNow.toISO(),
            [RouteFiltersFieldsName.DATE_TIME_END]: undefined,
            [RouteFiltersFieldsName.PEOPLE_NUMBER]: {
                [RouteFiltersPeopleNumberFieldsName.ADULT]: 1,
                [RouteFiltersPeopleNumberFieldsName.KID]: 0
            },
            [RouteFiltersFieldsName.POPULARITY]: Popularity.BALANCED,
            [RouteFiltersFieldsName.DIFFICULTY]: Difficulty.MEDIUM
        };
    }, []);

    const filterRoutes = useCallback((values: RouteFiltersFormValues) => {
        dispatch(getRouteRequest(values));
    }, [dispatch]);

    const formik = useFormik<RouteFiltersFormValues>({
        onSubmit: filterRoutes,
        initialValues,
        validateOnBlur: false
    });

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <h2 className={styles.title}>{t("userRoutes:filterForm.label")}</h2>
                <RouteTimeFields />
                <PeopleNumberPicker />
                <QuickFilters />
                <PrimaryButton
                    type="submit"
                    fluid
                    disabled={isRouteLoading}
                    loading={isRouteLoading}
                    className={styles.submit}
                >
                    {t("userRoutes:filterForm.submit")}
                </PrimaryButton>
            </Form>
        </FormikProvider>
    );
}