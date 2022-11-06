import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldType } from "@models/forms/enums";
import { ExtendedTags as ExtendedTagsEnum } from "@models/places/enums";
import { RouteFiltersFieldsName } from "@models/userRoutes/enums";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

export default function ExtendedTags() {
    const { t } = useTranslation("userRoutes");

    const tagsOptions = useMemo(() => Object.values(ExtendedTagsEnum).map((attribute) => ({
        value: attribute,
        displayText: t(`userRoutes:filterForm.fields.additional.tags.${attribute.toLowerCase()}`)
    })), [t]);

    return (
        <WithSuspense loader={<FormFieldPlaceholder />}>
            <FormField
                name={RouteFiltersFieldsName.TAGS}
                type={FormFieldType.CHECKBOX_GROUP}
                options={tagsOptions}
            />
        </WithSuspense>
    );
}
