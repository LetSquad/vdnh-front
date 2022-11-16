import { MapPointFeature } from "@models/mapPoints/types";
import { PreparedRouteInfo } from "@models/preparedRoutes/types";
import { TrafficFeature } from "@models/traffic/types";
import { Route } from "@models/userRoutes/types";

export interface BaseResponse {
    meta: {
        code: number;
        description: string;
    };
}

export type MapPointsResponse = {
    mapData: MapPointFeature[];
} & BaseResponse;

export type RouteResponse = {
    mapData: Route[];
} & BaseResponse;

export type PreparedRoutesResponse = {
    mapData: PreparedRouteInfo[];
} & BaseResponse;

export type TrafficResponse = {
    day: string;
    time: string;
    heatmap: TrafficFeature[];
} & BaseResponse;
