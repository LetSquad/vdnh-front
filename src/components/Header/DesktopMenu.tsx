import Localization from "@components/Localizations/Localization";
import { LinkWithResetPlaceActive } from "@coreUtils/LinkWithResetPlaceActive";
import { useMenuOptions } from "@hooks/useMenuOptions";
import { BaseRoutesSlugs } from "@models/routes/enums";

import styles from "./styles/DesktopMenu.module.scss";
import headerStyles from "./styles/Header.module.scss";

export default function DesktopMenu() {
    const menuOptions = useMenuOptions();

    return (
        <header className={headerStyles.header}>
            <LinkWithResetPlaceActive
                to={BaseRoutesSlugs.ROUTES}
                className={headerStyles.logo}
            />
            <div className={styles.headerMenu}>
                {menuOptions}
            </div>
            <div className={headerStyles.meta}>
                <Localization />
            </div>
        </header>
    );
}
