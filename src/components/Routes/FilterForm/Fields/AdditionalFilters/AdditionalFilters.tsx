import { useTranslation } from "react-i18next";

import AdditionalQuickFilters from "@components/Routes/FilterForm/Fields/AdditionalFilters/AdditionalQuickFilters";
import Tags from "@components/Routes/FilterForm/Fields/AdditionalFilters/Tags";
import Accordion from "@parts/Accordion/Accordion";

export default function AdditionalFilters() {
    const { t } = useTranslation("userRoutes");

    return (
        <Accordion title={t("userRoutes:filterForm.fields.additional.title")}>
            <AdditionalQuickFilters />
            <Tags />
        </Accordion>
    );
}
