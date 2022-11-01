import { useCallback } from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { LinkWithResetPlaceActive } from "@coreUtils/LinkWithResetPlaceActive";
import { useLocationActive } from "@hooks/useLocationActive";
import { BaseRoutesSlugs } from "@models/routes/enums";

import { BaseRoutes } from "@routes/BaseRoutes/BaseRoutes";

const Items = [{
    localizedNameKey: BaseRoutes.EVENTS.localizeNameKey,
    defaultName: BaseRoutes.EVENTS.defaultName,
    url: BaseRoutesSlugs.EVENTS
}, {
    localizedNameKey: BaseRoutes.PLACES.localizeNameKey,
    defaultName: BaseRoutes.PLACES.defaultName,
    url: BaseRoutesSlugs.PLACES
}, {
    localizedNameKey: BaseRoutes.ROUTES.localizeNameKey,
    defaultName: BaseRoutes.ROUTES.defaultName,
    url: BaseRoutesSlugs.ROUTES
}];

export function useMenuOptions(onClose?: () => void) {
    const isLocationActive = useLocationActive();
    const { t } = useTranslation("routes");

    const getOptions = useCallback(
        (menuOptions: { localizedNameKey: string; defaultName: string; url: string }[]) => menuOptions.map((option) => (
            <LinkWithResetPlaceActive
                to={option.url}
                key={option.url}
                className={classNames({ active: isLocationActive(option.url) })}
                onClick={() => {
                    if (onClose) {
                        onClose();
                    }
                }}
            >
                {t(option.localizedNameKey, option.defaultName)}
            </LinkWithResetPlaceActive>
        )),
        [isLocationActive, onClose, t]
    );

    return getOptions(Items);
}
