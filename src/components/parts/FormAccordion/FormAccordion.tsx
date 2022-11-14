import { Accordion, Icon } from "semantic-ui-react";

import { useToggle } from "@hooks/useToogle";

import styles from "./styles/FormAccordion.module.scss";

interface FormAccordionProps {
    title: string;
    children: JSX.Element[];
}

export default function FormAccordion({ title, children }: FormAccordionProps) {
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
                    {title}
                </Accordion.Title>
                <Accordion.Content active={isOpen}>
                    <div className={styles.accordionContent}>
                        {children}
                    </div>
                </Accordion.Content>
            </div>
        </Accordion>
    );
}
