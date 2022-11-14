import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { FormFieldType } from "@models/forms/enums";
import { DropdownOption } from "@models/forms/types";
import { RouteFiltersFieldsName } from "@models/userRoutes/enums";
import FormAccordion from "@parts/FormAccordion/FormAccordion";
import FormField from "@parts/FormField/FormField";
import { useAppSelector } from "@store/hooks";
import { selectAllEntrance } from "@store/mapPoints/selectors";

export default function Entrances() {
    const { t } = useTranslation("userRoutes");

    const entrances = useAppSelector(selectAllEntrance);

    const options = useMemo<DropdownOption[]>(() => entrances.map((entrance) => ({
        text: entrance.properties.localizedTitle || "",
        value: entrance.id,
        content: (
            <div>{entrance.properties.localizedTitle}</div>
        )
    })), [entrances]);

    return (
        <FormAccordion title={t("userRoutes:filterForm.fields.entrances.title")}>
            <FormField
                label={t("userRoutes:filterForm.fields.entrances.entrance.title")}
                placeholder={t("userRoutes:filterForm.fields.entrances.entrance.placeholder")}
                name={RouteFiltersFieldsName.ENTRANCE}
                type={FormFieldType.DROPDOWN}
                options={options}
                search
                clearable
            />
            <FormField
                label={t("userRoutes:filterForm.fields.entrances.exit.title")}
                placeholder={t("userRoutes:filterForm.fields.entrances.exit.placeholder")}
                name={RouteFiltersFieldsName.EXIT}
                type={FormFieldType.DROPDOWN}
                options={options}
                search
                clearable
            />
        </FormAccordion>
    );
}
