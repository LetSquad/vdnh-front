import { useMediaQuery } from "react-responsive";

import DesktopMenu from "@components/Header/DesktopMenu";
import MobileMenu from "@components/Header/MobileMenu";

export default function Header() {
    const isMobile = useMediaQuery({ maxWidth: 1024 });

    return isMobile
        ? <MobileMenu />
        : <DesktopMenu />;
}
