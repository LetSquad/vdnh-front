import { ObjectFeature } from "@models/places/types";

export interface BaseResponse {
    meta: {
        code: number;
        description: string;
    };
}

export type PlacesResponse = {
    dataBlock: ObjectFeature[];
} & BaseResponse;
