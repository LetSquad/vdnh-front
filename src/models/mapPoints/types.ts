import { Feature, Point } from "geojson";

import { Locales } from "@coreUtils/localizations/locales_constants";
import { IconType, MapPointCategory } from "@models/mapPoints/enums";
import { ExtendedTags } from "@models/places/enums";

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
    category: MapPointCategory.PLACE;
    events: number[],
    ticketsUrl?: string;
    scheduleClosingTime?: string;
    scheduleDayOff?: boolean;
    scheduleAdditionalInfo?: string[];
    visitTime?: number;
    tag: ExtendedTags;
    descriptionLocalized?: string;
};

export type EventProperty = Property & {
    category: MapPointCategory.EVENT;
    places: number[];
};

export interface PlaceFeature extends Feature<Point, PlaceProperty> {
    id: number;
}

export interface EventFeature extends Feature<Point, EventProperty> {
    id: number;
}

export type MapPointFeature = PlaceFeature | EventFeature;

type DescriptionLocalizations = {
    [key in `description${Locales}`]: string | null;
};

export interface MapPointInfo {
    id: number;
    category: MapPointCategory;
    description?: DescriptionLocalizations;
}

export interface MapPointTimeInfo {
    distance?: number;
    time?: number;
}
