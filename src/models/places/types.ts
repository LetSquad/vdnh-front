import { Feature, Point } from "geojson";

import { Locales } from "@coreUtils/localizations/locales_constants";
import { IconType, ObjectType } from "@models/places/enums";

type TitleLocalizations = {
    [key in `title${Locales}`]: string | null;
};

type ShortTitleLocalizations = {
    [key in `shortTitle${Locales}`]: string | null;
};

type TypeLocalizations = {
    [key in `type${Locales}`]: string | null;
};

export interface Property {
    isVisible: boolean;
    zoom: number;
    color: string;
    active?: boolean;
    localizedTitle?: string | null;
    title: TitleLocalizations;
    localizedShortTitle?: string | null;
    shortTitle: ShortTitleLocalizations;
    localizedType?: string | null;
    type: TypeLocalizations;
    icon: IconType;
    url: string;
    pic: string;
}

export type PlaceProperty = Property & {
    category: ObjectType.PLACE;
    events: number[]
};

export type EventProperty = Property & {
    category: ObjectType.EVENT;
    places: number[];
};

export interface ObjectFeature extends Feature<Point, PlaceProperty | EventProperty> {
    id: number;
}
