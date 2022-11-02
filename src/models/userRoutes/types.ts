import { LineString } from "geojson";

import { MapPointInfo } from "@models/mapPoints/types";
import {
    Difficulty,
    Popularity,
    RouteFiltersFieldsName,
    RouteFiltersPeopleNumberFieldsName
} from "@models/userRoutes/enums";

export interface Route {
    geometry: LineString;
    mapPoints: MapPointInfo[];
}

export interface RouteFiltersFormValues {
    [RouteFiltersFieldsName.DATE_TIME_START]: string;
    [RouteFiltersFieldsName.DATE_TIME_END]?: string;
    [RouteFiltersFieldsName.PEOPLE_NUMBER]: RouteFiltersPeopleNumber;
    [RouteFiltersFieldsName.POPULARITY]: Popularity;
    [RouteFiltersFieldsName.DIFFICULTY]: Difficulty;
}

export interface RouteFiltersPeopleNumber {
    [RouteFiltersPeopleNumberFieldsName.ADULT]: number;
    [RouteFiltersPeopleNumberFieldsName.KID]: number;
}