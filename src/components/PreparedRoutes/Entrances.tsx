import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { DropdownOption } from "@models/forms/types";
import { IconType } from "@models/mapPoints/enums";
import Accordion from "@parts/Accordion/Accordion";
import entranceIcon from "@static/images/svg/entrance.svg";
import entryIcon from "@static/images/svg/entry.svg";
import { useAppSelector } from "@store/hooks";
import { selectAllEntrance } from "@store/mapPoints/selectors";

import styles from "./styles/Entrance.module.scss";

export default function Entrances() {
    const { t } = useTranslation("preparedRoutes");

    const entrances = useAppSelector(selectAllEntrance);

    const options = useMemo<DropdownOption[]>(() => entrances.map((entrance) => {
        let icon;

        if (entrance.properties.icon === IconType.ENTRY) {
            icon = entryIcon;
        } else if (entrance.properties.icon === IconType.ENTRANCE) {
            icon = entranceIcon;
        }

        return {
            text: entrance.properties.localizedTitle || "",
            value: entrance.id,
            content: (
                <div className={styles.dropdownContent}>
                    {icon && (
                        <img
                            src={icon}
                            alt="icon"
                        />
                    )}
                    {entrance.properties.localizedTitle}
                </div>
            )
        };
    }), [entrances]);

    return (
        <Accordion title={t("preparedRoutes:entrances.title")}>
            <div />
            <div />
        </Accordion>
    );
}
