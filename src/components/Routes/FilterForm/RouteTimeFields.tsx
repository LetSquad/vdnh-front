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

    const roundedNow = roundTimeToMinutes(DateTime.now(), 30);

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
                    minDate={roundedNow.plus({ minute: 30 }).toJSDate()}
                />
            </WithSuspense>
        </div>
    );
}
