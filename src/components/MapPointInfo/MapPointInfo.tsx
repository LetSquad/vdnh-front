import { MapPointFeature } from "@models/mapPoints/types";

import styles from "./styles/MapPointInfo.module.scss";

interface MapPointInfoProps {
    mapPoint: MapPointFeature;
}

export default function MapPointInfo({ mapPoint }: MapPointInfoProps) {
    return (
        <div className={styles.container}>
            <div>{mapPoint.properties.localizedTitle}</div>
            <div>{mapPoint.properties.localizedType}</div>
        </div>
    );
}
