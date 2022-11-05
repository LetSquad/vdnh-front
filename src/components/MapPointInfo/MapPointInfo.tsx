import { MapPointFeature } from "@models/mapPoints/types";

import styles from "./styles/MapPointInfo.module.scss";

interface MapPointInfoProps {
    mapPoint: MapPointFeature;
}

export default function MapPointInfo({ mapPoint }: MapPointInfoProps) {
    return (
        <li>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={mapPoint.properties.url}
                className={styles.eventInfo}
            >
                {mapPoint.properties.localizedTitle}
            </a>
        </li>
    );
}
