import { useTranslation } from "react-i18next";

import styles from "./styles/LoadingErrorBlock.module.scss";

interface LoadingErrorBlockProps {
    isLoadingErrorObjectText: string;
    reload?: () => void;
    additionalContent?: JSX.Element;
}

export default function LoadingErrorBlock({ isLoadingErrorObjectText, reload, additionalContent }: LoadingErrorBlockProps) {
    const { t } = useTranslation("errors");

    return (
        <div className={styles.failedContainer}>
            <span>
                {t("errors:baseError.text", { errorInfo: isLoadingErrorObjectText })}
                {reload
                    ? (
                        <>
                            {t("errors:baseError.repeatWithLink")}
                            <span
                                aria-hidden
                                className={styles.failedContainerLink}
                                onClick={reload}
                            >
                                {t("errors:baseError.repeatLink")}
                            </span>
                        </>
                    )
                    : t("errors:baseError.repeat")}
            </span>
            {additionalContent}
        </div>
    );
}
