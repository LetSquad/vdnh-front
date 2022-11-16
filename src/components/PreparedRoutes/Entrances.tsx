import { useCallback, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Form } from "semantic-ui-react";

import { DropdownOption } from "@models/forms/types";
import { IconType } from "@models/mapPoints/enums";
import Accordion from "@parts/Accordion/Accordion";
import entranceIcon from "@static/images/svg/entrance.svg";
import entryIcon from "@static/images/svg/entry.svg";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { selectAllEntrance } from "@store/mapPoints/selectors";
import { getPreparedRouteRequest } from "@store/preparedRoutes/reducer";

import styles from "./styles/Entrance.module.scss";

interface EntrancesProps {
    routeId: number;
}

export default function Entrances({ routeId }: EntrancesProps) {
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const { t } = useTranslation("preparedRoutes");

    const [currentEntrance, setCurrentEntrance] = useState(
        searchParams.get("entrance")
            ? Number.parseInt(searchParams.get("entrance") as string, 10)
            : undefined
    );
    const [currentExit, setCurrentExit] = useState(
        searchParams.get("exit")
            ? Number.parseInt(searchParams.get("exit") as string, 10)
            : undefined
    );

    const entrances = useAppSelector(selectAllEntrance);

    const updateSearchParams = useCallback((key: string, value: number | undefined) => {
        if (value !== undefined) {
            searchParams.set(key, value.toString());
        } else {
            searchParams.delete(key);
        }

        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    const onChangeEntrance = useCallback((newEntrance: number | undefined) => {
        dispatch(getPreparedRouteRequest({ entrance: newEntrance, exit: currentExit, id: routeId }));
        updateSearchParams("entrance", newEntrance);
        setCurrentEntrance(newEntrance);
    }, [currentExit, dispatch, routeId, updateSearchParams]);

    const onChangeExit = useCallback((newExit: number | undefined) => {
        dispatch(getPreparedRouteRequest({ entrance: currentEntrance, exit: newExit, id: routeId }));
        updateSearchParams("exit", newExit);
        setCurrentExit(newExit);
    }, [currentEntrance, dispatch, routeId, updateSearchParams]);

    const options = useMemo<DropdownOption[]>(() => entrances.map((_entrance) => {
        let icon;

        if (_entrance.properties.icon === IconType.ENTRY) {
            icon = entryIcon;
        } else if (_entrance.properties.icon === IconType.ENTRANCE) {
            icon = entranceIcon;
        }

        return {
            text: _entrance.properties.localizedTitle || "",
            value: _entrance.id,
            content: (
                <div className={styles.dropdownContent}>
                    {icon && (
                        <img
                            src={icon}
                            alt="icon"
                        />
                    )}
                    {_entrance.properties.localizedTitle}
                </div>
            )
        };
    }), [entrances]);

    return (
        <Form>
            <Accordion title={t("preparedRoutes:entrances.title")}>
                <Form.Dropdown
                    label={t("preparedRoutes:entrances.entrance.title")}
                    value={currentEntrance}
                    options={options}
                    onChange={(_event, data) => onChangeEntrance(data.value as number | undefined)}
                    placeholder={t("preparedRoutes:entrances.entrance.placeholder")}
                    selection
                    search
                    clearable
                    className={styles.dropdown}
                />
                <Form.Dropdown
                    label={t("preparedRoutes:entrances.exit.title")}
                    value={currentExit}
                    options={options}
                    onChange={(_event, data) => onChangeExit(data.value as number | undefined)}
                    placeholder={t("preparedRoutes:entrances.exit.placeholder")}
                    selection
                    search
                    clearable
                    className={styles.dropdown}
                />
            </Accordion>
        </Form>
    );
}
