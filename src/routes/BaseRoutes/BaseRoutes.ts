import { lazy } from "react";

import { BaseRoutesSlugs } from "@models/routes/enums";
import { Page as PageType } from "@models/routes/types";

const Events = lazy(/* webpackChunkName: "Events" */ () => import("@components/Events/Events"));
const Places = lazy(/* webpackChunkName: "Places" */ () => import("@components/Places/Places"));
const Routes = lazy(/* webpackChunkName: "Routes" */ () => import("@components/Routes/Routes"));

export const BaseRoutes: PageType = {
    EVENTS: {
        localizeNameKey: "routes:events",
        defaultName: "События",
        slug: BaseRoutesSlugs.EVENTS_WITH_CHILD,
        component: Events
    },
    PLACES: {
        localizeNameKey: "routes:places",
        defaultName: "Места",
        slug: BaseRoutesSlugs.PLACES_WITH_CHILD,
        component: Places
    },
    ROUTES: {
        localizeNameKey: "routes:routes",
        defaultName: "Маршруты",
        slug: BaseRoutesSlugs.ROUTES,
        component: Routes
    }
};
