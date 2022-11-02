import { Feature, Point } from "geojson";

export interface Property {
    mapPointId: number,
    loadFactor: number
}

export interface TrafficFeature extends Feature<Point, Property> {
    id: undefined;
}
