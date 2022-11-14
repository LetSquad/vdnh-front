import { useCallback, useMemo } from "react";

import { Icon } from "semantic-ui-react";

import { useIsOverlay, useToggleOverlay } from "@components/App/OverlayContext";
import LoyaltyProgram from "@components/Header/LoyaltyProgram";
import Localization from "@components/Localizations/Localization";
import Socials from "@components/Socials/Socials";
import { LinkWithResetPlaceActive } from "@coreUtils/LinkWithResetPlaceActive";
import { useMenuOptions } from "@hooks/useMenuOptions";
import { useToggle } from "@hooks/useToogle";
import { BaseRoutesSlugs } from "@models/routes/enums";

import headerStyles from "./styles/Header.module.scss";
import styles from "./styles/MobileMenu.module.scss";

export default function MobileMenu() {
    const isOverlay = useIsOverlay();
    const toggleOverlay = useToggleOverlay();

    const [isSidebarOpen, toggleSidebar] = useToggle(isOverlay);

    const toggleMenu = useCallback(() => {
        toggleSidebar();
        toggleOverlay();
    }, [toggleOverlay, toggleSidebar]);

    const menuOptions = useMenuOptions(toggleMenu);

    const menu = useMemo(() => (
        <div className={styles.sidebarMenu}>
            <div className={styles.sidebarMenuTop}>
                {menuOptions}
            </div>
            <LoyaltyProgram />
            <div className={styles.sidebarMenuBottom}>
                <div className={styles.sidebarMenuBottomContent}>
                    <div className={styles.phoneContainer}>
                        <a
                            className={styles.phoneLink}
                            href="tel:+74955443400"
                        >
                            +7 (495) 544-34-00
                        </a>
                    </div>
                    <div className={styles.emailContainer}>
                        <a
                            className={styles.emailLink}
                            href="mailto:info@vdnh.ru"
                        >
                            info@vdnh.ru
                        </a>
                    </div>
                    <Socials />
                </div>
            </div>
        </div>
    ), [menuOptions]);

    return (
        <header className={headerStyles.header}>
            <LinkWithResetPlaceActive
                to={BaseRoutesSlugs.ROUTES}
                className={headerStyles.logo}
            />
            <Icon
                className={styles.sidebarMenuIcon}
                name="bars"
                onClick={toggleMenu}
                size="large"
                link
            />
            {
                isSidebarOpen
                    ? (
                        <>
                            <div className={headerStyles.meta}>
                                <Localization />
                            </div>
                            {menu}
                        </>
                    )
                    : null
            }
        </header>
    );
}
