import { useTranslation } from "react-i18next";

import AdditionalQuickFilters from "@components/Routes/FilterForm/Fields/AdditionalFilters/AdditionalQuickFilters";
import Tags from "@components/Routes/FilterForm/Fields/AdditionalFilters/Tags";
import FormAccordion from "@parts/FormAccordion/FormAccordion";

export default function AdditionalFilters() {
    const { t } = useTranslation("userRoutes");

    return (
        <FormAccordion title={t("userRoutes:filterForm.fields.additional.title")}>
            <AdditionalQuickFilters />
            <Tags />
        </FormAccordion>
    );
}
