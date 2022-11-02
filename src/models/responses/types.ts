import { MapPointFeature } from "@models/mapPoints/types";
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

export type TrafficResponse = {
    day: string;
    time: string;
    heatmap: TrafficFeature[];
} & BaseResponse;
