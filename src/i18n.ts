import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { defaultLocale, defaultLocalesNamespaces, supportedLocales } from "@coreUtils/localizations/locales_constants";
import { getLanguageFromLocalStorage } from "@coreUtils/localizations/utils";

i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
        lng: getLanguageFromLocalStorage(),
        supportedLngs: supportedLocales,
        fallbackLng: defaultLocale,
        ns: defaultLocalesNamespaces,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
