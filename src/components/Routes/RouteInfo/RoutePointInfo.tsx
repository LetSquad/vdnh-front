import { useTranslation } from "react-i18next";

import styles from "@components/Routes/RouteInfo/styles/RoutePointInfo.module.scss";
import { MapPointFeature } from "@models/mapPoints/types";

interface MapPointInfoProps {
    order: number;
    mapPoint: MapPointFeature;
}

export default function RoutePointInfo({ order, mapPoint }: MapPointInfoProps) {
    const { t } = useTranslation("userRoutes");

    return (
        <div>
            <h4>{`${order}. ${mapPoint.properties.localizedTitle}`}</h4>
            <div className={styles.pointInfo}>
                <img
                    className={styles.pic}
                    src={mapPoint.properties.pic}
                    alt={mapPoint.properties.localizedTitle || ""}
                />
                <div className={styles.pointRightBlock}>
                    <div className={styles.type}>{mapPoint.properties.localizedType}</div>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={mapPoint.properties.url}
                        className={styles.additionalInfo}
                    >
                        {t("userRoutes:routeInfo.additionalInfo")}
                    </a>
                </div>
            </div>
            <hr />
        </div>
    );
}
