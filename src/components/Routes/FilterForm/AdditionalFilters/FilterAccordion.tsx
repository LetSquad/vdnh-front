import { useTranslation } from "react-i18next";
import { Accordion, Icon } from "semantic-ui-react";

import AdditionalQuickFilters from "@components/Routes/FilterForm/AdditionalFilters/AdditionalQuickFilters";
import Tags from "@components/Routes/FilterForm/AdditionalFilters/Tags";
import { useToggle } from "@hooks/useToogle";

import styles from "./styles/FilterAccordion.module.scss";

export default function FilterAccordion() {
    const { t } = useTranslation("userRoutes");

    const [isOpen, toggleOpen] = useToggle();

    return (
        <Accordion className={styles.accordionContainer}>
            <div>
                <Accordion.Title
                    className={styles.accordionTitle}
                    active={isOpen}
                    index={0}
                    onClick={toggleOpen}
                >
                    <Icon name="dropdown" />
                    {t("userRoutes:filterForm.fields.additional.title")}
                </Accordion.Title>
                <Accordion.Content active={isOpen}>
                    <div className={styles.accordionContent}>
                        <AdditionalQuickFilters />
                        <Tags />
                    </div>
                </Accordion.Content>
            </div>
        </Accordion>
    );
}
