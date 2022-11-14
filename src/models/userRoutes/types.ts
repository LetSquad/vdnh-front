import { LineString } from "geojson";

import { MapPointInfo, MapPointTimeInfo } from "@models/mapPoints/types";
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
    id: string;
    geometry: LineString;
    mapPoints: MapPointInfo[];
    mapPointTimes: MapPointTimeInfo[];
    distance?: number;
    time?: number;
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
    [RouteFiltersFieldsName.ENTRANCE]?: number;
    [RouteFiltersFieldsName.EXIT]?: number;
}

export interface RouteFiltersPeopleNumber {
    [RouteFiltersPeopleNumberFieldsName.ADULT]: number;
    [RouteFiltersPeopleNumberFieldsName.KID]: number;
}
