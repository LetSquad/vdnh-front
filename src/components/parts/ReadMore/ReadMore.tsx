import { useCallback, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import styles from "./styles/ReadMore.module.scss";

interface ReadMoreProps {
    text: string;
}

export default function ReadMore({ text }: ReadMoreProps) {
    const { t } = useTranslation("readMore");

    const [expanded, setExpanded] = useState(false);

    const changeState = useCallback(() => {
        setExpanded((prevState) => !prevState);
    }, []);

    const trimText = useMemo(() => {
        if (text.length < 120) {
            return text;
        }

        const trimmedText = text.slice(0, 120);
        return `${trimmedText.slice(0, Math.max(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" "))))}...`;
    }, [text]);

    return (
        <div>
            {expanded ? text : trimText}
            <span
                className={styles.link}
                aria-hidden
                onClick={changeState}
            >
                {expanded ? t("readMore:readLess") : t("readMore:readMore")}
            </span>
        </div>
    );
}
