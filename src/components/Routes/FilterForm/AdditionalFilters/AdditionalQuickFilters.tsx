import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldType } from "@models/forms/enums";
import {
    LocationPlacement,
    Movement,
    Payment,
    RouteFiltersFieldsName
} from "@models/userRoutes/enums";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

export default function AdditionalQuickFilters() {
    const { t } = useTranslation("userRoutes");

    const locationPlacementOptions = useMemo(() => Object.values(LocationPlacement).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.additional.locationPlacement.${attribute.toLowerCase()}`)
    })), [t]);

    const paymentOptions = useMemo(() => Object.values(Payment).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.additional.payment.${attribute.toLowerCase()}`)
    })), [t]);

    const movementOptions = useMemo(() => Object.values(Movement).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.additional.movement.${attribute.toLowerCase()}`)
    })), [t]);

    return (
        <div>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.LOAD_FACTOR}
                    type={FormFieldType.CHECKBOX}
                    label={t("userRoutes:filterForm.fields.additional.loadFactor")}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.FOOD}
                    type={FormFieldType.CHECKBOX}
                    label={t("userRoutes:filterForm.fields.additional.food")}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.LOCATION_PLACEMENT}
                    type={FormFieldType.BUTTON_GROUP}
                    fluid
                    options={locationPlacementOptions}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.PAYMENT}
                    type={FormFieldType.BUTTON_GROUP}
                    fluid
                    options={paymentOptions}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.MOVEMENT}
                    type={FormFieldType.BUTTON_GROUP}
                    fluid
                    options={movementOptions}
                />
            </WithSuspense>
        </div>
    );
}
