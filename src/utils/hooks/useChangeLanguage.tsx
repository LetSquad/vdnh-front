import { createAction } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

import { SupportedLocales, supportedLocales } from "@coreUtils/localizations/locales_constants";
import { setLanguageToLocalStorage } from "@coreUtils/localizations/localStorageUtils";
import { useAppDispatch } from "@store/hooks";

export function useChangeLanguage() {
    const dispatch = useAppDispatch();

    const { i18n } = useTranslation();

    return (newLang: SupportedLocales) => {
        if (!supportedLocales.includes(newLang) || i18n.language === newLang) {
            return;
        }

        i18n.changeLanguage(newLang).then(() => {
            setLanguageToLocalStorage(newLang);
            dispatch(changeLanguage(newLang));
        });
    };
}

export const changeLanguage = createAction<string>("language/change");
