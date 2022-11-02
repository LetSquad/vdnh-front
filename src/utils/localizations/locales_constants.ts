export enum SupportedLocales {
    RU = "ru",
    EN = "en",
    CN = "cn"
}

export enum SupportedLocalesCapitalize {
    RU = "Ru",
    EN = "En",
    CN = "Cn"
}

export const defaultLocale = SupportedLocales.RU;

export type Locales = SupportedLocalesCapitalize.RU | SupportedLocalesCapitalize.EN | SupportedLocalesCapitalize.CN;

export const supportedLocales = Object.values(SupportedLocales);

export const supportedLocalesWithTitle = [
    { code: SupportedLocales.RU, title: "РУ" },
    { code: SupportedLocales.EN, title: "EN" },
    { code: SupportedLocales.CN, title: "简体中文" }
];

export const defaultLocalesNamespaces = ["routes", "errors"];
