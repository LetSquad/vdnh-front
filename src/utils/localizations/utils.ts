import { defaultLocale } from "@coreUtils/localizations/locales_constants";

export function getLanguageFromLocalStorage(): string {
    return localStorage.getItem("lang") || defaultLocale;
}

export function setLanguageToLocalStorage(lang: string) {
    localStorage.setItem("lang", lang);
}
