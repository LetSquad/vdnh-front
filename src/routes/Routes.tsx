import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";

import NotFoundErrorScreen from "@coreUtils/NotFoundErrorScreen";

import { BaseRoutes } from "@routes/BaseRoutes/BaseRoutes";
import { pagesToRoutes } from "@routes/utils";

export default function Routes() {
    return (
        <RouterRoutes>
            <Route
                index
                element={(
                    <Navigate
                        replace
                        to={BaseRoutes.ROUTES.slug}
                    />
                )}
            />
            {pagesToRoutes(BaseRoutes)}
            <Route
                key="not-found"
                path="*"
                element={<NotFoundErrorScreen />}
            />
        </RouterRoutes>
    );
}
