import { LineString } from "geojson";

import { MapPointInfo } from "@models/mapPoints/types";
import {
    Difficulty,
    Movement,
    Payment,
    Popularity,
    RouteFiltersFieldsName,
    RouteFiltersPeopleNumberFieldsName,
    Tags
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
    [RouteFiltersFieldsName.PAYMENT]: Payment;
    [RouteFiltersFieldsName.MOVEMENT]: Movement;
    [RouteFiltersFieldsName.TAGS]: Tags[];
}

export interface RouteFiltersPeopleNumber {
    [RouteFiltersPeopleNumberFieldsName.ADULT]: number;
    [RouteFiltersPeopleNumberFieldsName.KID]: number;
}
