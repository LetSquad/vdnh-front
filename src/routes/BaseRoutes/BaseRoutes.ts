import { lazy } from "react";

import { BaseRoutesSlugs } from "@models/routes/enums";
import { Page as PageType } from "@models/routes/types";

const Events = lazy(/* webpackChunkName: "Events" */ () => import("@components/Events/Events"));
const Places = lazy(/* webpackChunkName: "Places" */ () => import("@components/Places/Places"));
const Routes = lazy(/* webpackChunkName: "Routes" */ () => import("@components/Routes/Routes"));
const PreparedRoutes = lazy(/* webpackChunkName: "PreparedRoutes" */ () => import("@components/PreparedRoutes/PreparedRoutes"));
const PreparedRoute = lazy(/* webpackChunkName: "PreparedRoute" */ () => import("@components/PreparedRoutes/PreparedRoute"));

export const BaseRoutes: PageType = {
    ROUTES: {
        localizeNameKey: "routes:routes",
        defaultName: "Маршруты",
        slug: BaseRoutesSlugs.ROUTES,
        component: Routes
    },
    PREPARED_ROUTES: {
        localizeNameKey: "routes:preparedRoutes",
        defaultName: "Тематические маршруты",
        slug: BaseRoutesSlugs.PREPARED_ROUTES,
        component: PreparedRoutes
    },
    PREPARED_ROUTE: {
        localizeNameKey: "routes:preparedRoute",
        defaultName: "Тематический маршрут",
        slug: BaseRoutesSlugs.PREPARED_ROUTE,
        component: PreparedRoute
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
