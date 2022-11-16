import { Locales } from "@coreUtils/localizations/locales_constants";
import { Route } from "@models/userRoutes/types";

type TitleLocalizations = {
    [key in `title${Locales}`]: string | null;
};

type DescriptionLocalizations = {
    [key in `description${Locales}`]: string | null;
};

export interface PreparedRoute {
    id: number;
    title: TitleLocalizations,
    description: DescriptionLocalizations
    imageUrl: string,
    route: Route
}

export interface PreparedRouteInfo {
    id: number;
    title: TitleLocalizations;
    previewImageUrl: string;
    duration: number;
}

export interface PreparedRouteRequestData {
    id: number,
    entrance?: number,
    exit?: number
}
