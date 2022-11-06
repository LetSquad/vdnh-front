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

    const [{ value }] = useField<string | undefined>(RouteFiltersFieldsName.DATE_TIME_START);

    const roundedNow = roundTimeToMinutes(DateTime.now(), 30);
    const roundedEnd = roundedNow.plus({ minute: 30 });

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
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder className={styles.fieldEnd} />}>
                <FormField
                    name={`${RouteFiltersFieldsName.DATE_TIME_END}`}
                    label={t("userRoutes:filterForm.fields.dateEnd.label")}
                    type={FormFieldType.DATE_TIMEPICKER}
                    placeholder={t("userRoutes:filterForm.fields.dateEnd.placeholder")}
                    className={styles.fieldEnd}
                    minDate={value ? DateTime.fromISO(value).toJSDate() : roundedEnd.toJSDate()}
                    minTime={
                        value
                            ? DateTime.fromISO(value).plus({ minute: 30 }).toJSDate()
                            : roundedEnd.plus({ minute: 30 }).toJSDate()
                    }
                    maxTime={
                        value
                            ? DateTime.fromISO(value).set({ minute: 30, hour: 23 }).toJSDate()
                            : roundedNow.set({ minute: 30, hour: 23 }).toJSDate()
                    }
                />
            </WithSuspense>
        </div>
    );
}
