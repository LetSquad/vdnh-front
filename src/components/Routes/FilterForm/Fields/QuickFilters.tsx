import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldType } from "@models/forms/enums";
import { Difficulty, Popularity, RouteFiltersFieldsName } from "@models/userRoutes/enums";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

export default function QuickFilters() {
    const { t } = useTranslation("userRoutes");

    const popularityOptions = useMemo(() => Object.values(Popularity).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.popularity.${attribute.toLowerCase()}`)
    })), [t]);

    const difficultyOptions = useMemo(() => Object.values(Difficulty).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.difficulty.${attribute.toLowerCase()}`)
    })), [t]);

    return (
        <div>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.POPULARITY}
                    type={FormFieldType.BUTTON_GROUP}
                    fluid
                    options={popularityOptions}
                />
            </WithSuspense>
            <WithSuspense loader={<FormFieldPlaceholder />}>
                <FormField
                    name={RouteFiltersFieldsName.DIFFICULTY}
                    type={FormFieldType.BUTTON_GROUP}
                    fluid
                    options={difficultyOptions}
                />
            </WithSuspense>
        </div>
    );
}
