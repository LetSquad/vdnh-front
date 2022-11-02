import { MapPointFeature } from "@models/mapPoints/types";
import { Route } from "@models/userRoutes/types";

export interface BaseResponse {
    meta: {
        code: number;
        description: string;
    };
}

export type MapPointsResponse = {
    dataBlock: MapPointFeature[];
} & BaseResponse;

export type RouteResponse = {
    dataBlock: Route;
} & BaseResponse;
