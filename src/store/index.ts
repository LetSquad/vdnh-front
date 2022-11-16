import { configureStore } from "@reduxjs/toolkit";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import mapPointsReducer from "./mapPoints/reducer";
import preparedRoutesReducer from "./preparedRoutes/reducer";
import routesReducer from "./routes/reducer";
import trafficReducer from "./traffic/reducer";

export const store = configureStore({
    reducer: {
        mapPoints: mapPointsReducer,
        routes: routesReducer,
        traffic: trafficReducer,
        preparedRoutes: preparedRoutesReducer
    },
    devTools: process.env.NODE_ENV !== "production",
    // eslint-disable-next-line unicorn/prefer-spread
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([promise, thunk])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
