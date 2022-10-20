import map from "@static/images/svg/map.svg";

import styles from "./styles/App.module.scss";

export default function AppContent() {
    return (
        <div className={styles.mapBox}>
            <img
                className={styles.map}
                src={map}
                alt="VDNH Map"
            />
        </div>
    );
}
