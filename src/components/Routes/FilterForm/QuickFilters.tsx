import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { FormFieldType } from "@models/forms/enums";
import { Difficulty, Popularity, RouteFiltersFieldsName } from "@models/userRoutes/enums";
import FormField from "@parts/FormField/FormField";

export default function QuickFilters() {
    const { t } = useTranslation("userRoutes");

    const popularityOptions = useMemo(() => Object.values(Popularity).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.popularity.${attribute}`)
    })), [t]);

    const difficultyOptions = useMemo(() => Object.values(Difficulty).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.difficulty.${attribute}`)
    })), [t]);

    return (
        <>
            <FormField
                name={RouteFiltersFieldsName.POPULARITY}
                type={FormFieldType.BUTTON_GROUP}
                fluid
                options={popularityOptions}
            />
            <FormField
                name={RouteFiltersFieldsName.DIFFICULTY}
                type={FormFieldType.BUTTON_GROUP}
                fluid
                options={difficultyOptions}
            />
        </>
    );
}
