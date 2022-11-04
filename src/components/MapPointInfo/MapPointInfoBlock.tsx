import { useCallback } from "react";

import { useSearchParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { MapPointFeature } from "@models/mapPoints/types";
import { useAppDispatch } from "@store/hooks";
import { setMapPointsUnActive } from "@store/mapPoints/reducer";

import styles from "./styles/MapPointInfo.module.scss";

interface MapPointInfoProps {
    mapPoint: MapPointFeature;
}

export default function MapPointInfoBlock({ mapPoint }: MapPointInfoProps) {
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const onClose = useCallback(() => {
        for (const key of searchParams.keys()) {
            searchParams.delete(key);
        }

        setSearchParams(searchParams);
        dispatch(setMapPointsUnActive());
    }, [dispatch, searchParams, setSearchParams]);

    return (
        <div className={styles.container}>
            <Icon
                name="remove"
                link
                onClick={onClose}
                className={styles.closeIcon}
            />
        </div>
    );
}
