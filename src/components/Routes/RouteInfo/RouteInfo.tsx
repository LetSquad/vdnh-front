import { useCallback } from "react";

import { useTranslation } from "react-i18next";

import SecondaryButton from "@parts/Buttons/SecondaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetRoute } from "@store/routes/reducer";
import { selectAllRouteMapPoint } from "@store/routes/selectors";

export default function RouteInfo() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("userRoutes");

    const mapPoints = useAppSelector(selectAllRouteMapPoint);

    const reset = useCallback(() => {
        dispatch(resetRoute());
    }, [dispatch]);

    return (
        <div>
            {mapPoints.map((mapPoint) => mapPoint.properties.localizedTitle)}
            <SecondaryButton onClick={reset}>
                {t("userRoutes:routeInfo.reset")}
            </SecondaryButton>
        </div>
    );
}
