import { lazy } from "react";

import { BaseRoutesSlugs } from "@models/routes/enums";
import { Page as PageType } from "@models/routes/types";

const Events = lazy(/* webpackChunkName: "Events" */ () => import("@components/Events/Events"));
const Places = lazy(/* webpackChunkName: "Places" */ () => import("@components/Places/Places"));
const Routes = lazy(/* webpackChunkName: "Routes" */ () => import("@components/Routes/Routes"));

export const BaseRoutes: PageType = {
    ROUTES: {
        localizeNameKey: "routes:routes",
        defaultName: "Маршруты",
        slug: BaseRoutesSlugs.ROUTES,
        component: Routes
    },
    PLACES: {
        localizeNameKey: "routes:places",
        defaultName: "Места",
        slug: BaseRoutesSlugs.PLACES,
        component: Places
    },
    EVENTS: {
        localizeNameKey: "routes:events",
        defaultName: "События",
        slug: BaseRoutesSlugs.EVENTS,
        component: Events
    }
};
