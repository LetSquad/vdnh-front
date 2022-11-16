import { Accordion as SemanticAccordion, Icon } from "semantic-ui-react";

import { useToggle } from "@hooks/useToogle";

import styles from "./styles/Accordion.module.scss";

interface AccordionProps {
    title: string;
    children: JSX.Element[];
}

export default function Accordion({ title, children }: AccordionProps) {
    const [isOpen, toggleOpen] = useToggle();

    return (
        <SemanticAccordion className={styles.accordionContainer}>
            <div>
                <SemanticAccordion.Title
                    className={styles.accordionTitle}
                    active={isOpen}
                    index={0}
                    onClick={toggleOpen}
                >
                    <Icon name="dropdown" />
                    {title}
                </SemanticAccordion.Title>
                <SemanticAccordion.Content active={isOpen}>
                    <div className={styles.accordionContent}>
                        {children}
                    </div>
                </SemanticAccordion.Content>
            </div>
        </SemanticAccordion>
    );
}
