import { useCallback, useEffect } from "react";

import { useField } from "formik";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

import { roundTimeToMinutes } from "@coreUtils/utils";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldType } from "@models/forms/enums";
import { RouteFiltersFieldsName } from "@models/userRoutes/enums";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import styles from "./styles/RouteTimeFields.module.scss";

export default function RouteTimeFields() {
    const { t } = useTranslation("userRoutes");

    const [{ value: dateTimeStart }] = useField<string | undefined>(RouteFiltersFieldsName.DATE_TIME_START);
    const [
        { value: dateTimeEnd }, ,
        { setValue: setDateTimeEnd }
    ] = useField<string | undefined>(RouteFiltersFieldsName.DATE_TIME_END);

    const roundedNow = roundTimeToMinutes(DateTime.now(), 30);
    const roundedEnd = roundedNow.plus({ minute: 30 });

    const filterEndTime = useCallback((time: Date) => {
        const startDateTime = dateTimeStart ? DateTime.fromISO(dateTimeStart) : DateTime.now();

        const selectedDate = DateTime.fromJSDate(time).set({ second: 0, millisecond: 0 });

        return selectedDate.diff(startDateTime.set({ second: 0, millisecond: 0 }), "minute").minutes >= 30;
    }, [dateTimeStart]);

    const filterStartTime = useCallback((time: Date) => {
        const now = DateTime.now();

        const selectedDate = DateTime.fromJSDate(time).set({ second: 0, millisecond: 0 });

        return selectedDate.diff(now.set({ second: 0, millisecond: 0 }), "minute").minutes >= 0;
    }, []);

    useEffect(() => {
        if (dateTimeStart && dateTimeEnd) {
            const dateTimeStartObject = DateTime.fromISO(dateTimeStart);
            const dateTimeEndObject = DateTime.fromISO(dateTimeEnd);

            if (dateTimeEndObject.diff(dateTimeStartObject, "minute").minutes < 30) {
                setDateTimeEnd(dateTimeStartObject.plus({ minute: 30 }).toISO());
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateTimeStart]);

    return (
        <div className={styles.container}>
            <WithSuspense loader={<FormFieldPlaceholder className={styles.fieldStart} />}>
                <FormField
                    name={`${RouteFiltersFieldsName.DATE_TIME_START}`}
                    label={t("userRoutes:filterForm.fields.dateStart.label")}
                    type={FormFieldType.DATE_TIMEPICKER}
                    placeholder={t("userRoutes:filterForm.fields.dateStart.placeholder")}
                    className={styles.fieldStart}
                    minDate={roundedNow.toJSDate()}
                    filterTime={filterStartTime}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder className={styles.fieldEnd} />}>
                <FormField
                    name={`${RouteFiltersFieldsName.DATE_TIME_END}`}
                    label={t("userRoutes:filterForm.fields.dateEnd.label")}
                    type={FormFieldType.DATE_TIMEPICKER}
                    placeholder={t("userRoutes:filterForm.fields.dateEnd.placeholder")}
                    className={styles.fieldEnd}
                    minDate={dateTimeStart ? DateTime.fromISO(dateTimeStart).toJSDate() : roundedEnd.toJSDate()}
                    filterTime={filterEndTime}
                />
            </WithSuspense>
        </div>
    );
}
