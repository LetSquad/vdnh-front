import Socials from "@components/Socials/Socials";
import { useMenuOptions } from "@hooks/useMenuOptions";

import styles from "./styles/Footer.module.scss";

export default function Footer() {
    const menuOptions = useMenuOptions();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.socials}>
                    <Socials />
                </div>
                <div className={styles.links}>
                    {menuOptions}
                </div>
            </div>
        </footer>
    );
}
