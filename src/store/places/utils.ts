import { defaultLocale, Locales } from "@coreUtils/localizations/locales_constants";
import { capitalizeFirstLetter } from "@coreUtils/utils";
import { ObjectFeature } from "@models/places/types";

export function localizePlaces(places: ObjectFeature[], targetLang: string) {
    return places.map((place) => localizePlace(place, targetLang));
}

export function localizePlace(place: ObjectFeature, targetLang: string) {
    place.properties = {
        ...place.properties,
        localizedType: place.properties.type[`type${capitalizeFirstLetter(targetLang) as Locales}`] || place.properties.type[`type${capitalizeFirstLetter(defaultLocale) as Locales}`],
        localizedTitle: place.properties.title[`title${capitalizeFirstLetter(targetLang) as Locales}`] || place.properties.title[`title${capitalizeFirstLetter(defaultLocale) as Locales}`],
        localizedShortTitle: place.properties.shortTitle[`shortTitle${capitalizeFirstLetter(targetLang) as Locales}`] || place.properties.shortTitle[`shortTitle${capitalizeFirstLetter(defaultLocale) as Locales}`]
    };

    return place;
}
