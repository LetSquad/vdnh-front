import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { supportedLocalesWithTitle } from "@coreUtils/localizations/locales_constants";
import { useChangeLanguage } from "@hooks/useChangeLanguage";
import InlineButton from "@parts/Buttons/InlineButton";

import styles from "./styles/Localization.module.scss";

export default function Localization() {
    const { i18n } = useTranslation();

    const changeLanguage = useChangeLanguage();

    const localeLinks = useMemo(() => {
        const locales = supportedLocalesWithTitle.filter((locale) => locale.code !== i18n.language);

        return locales.map((locale) => (
            <InlineButton
                active={locale.code === i18n.language}
                key={locale.code}
                onClick={() => changeLanguage(locale.code)}
            >
                {locale.title}
            </InlineButton>
        ));
    }, [changeLanguage, i18n.language]);

    return (
        <div className={styles.localization}>
            {localeLinks}
        </div>
    );
}
