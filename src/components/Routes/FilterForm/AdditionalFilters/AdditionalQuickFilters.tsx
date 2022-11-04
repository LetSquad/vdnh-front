import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldType } from "@models/forms/enums";
import { Movement, Payment, RouteFiltersFieldsName } from "@models/userRoutes/enums";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

export default function AdditionalQuickFilters() {
    const { t } = useTranslation("userRoutes");

    const popularityOptions = useMemo(() => Object.values(Payment).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.payment.${attribute.toLowerCase()}`)
    })), [t]);

    const difficultyOptions = useMemo(() => Object.values(Movement).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.movement.${attribute.toLowerCase()}`)
    })), [t]);

    return (
        <div>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.LOAD_FACTOR}
                    type={FormFieldType.CHECKBOX}
                    label={t("userRoutes:filterForm.fields.loadFactor")}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.FOOD}
                    type={FormFieldType.CHECKBOX}
                    label={t("userRoutes:filterForm.fields.food")}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.PAYMENT}
                    type={FormFieldType.BUTTON_GROUP}
                    fluid
                    options={popularityOptions}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.MOVEMENT}
                    type={FormFieldType.BUTTON_GROUP}
                    fluid
                    options={difficultyOptions}
                />
            </WithSuspense>
        </div>
    );
}
