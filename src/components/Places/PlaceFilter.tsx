import { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Checkbox } from "semantic-ui-react";

import { ExtendedTags as ExtendedTagsEnum } from "@models/places/enums";
import checkboxGroupStyles from "@parts/FormField/styles/CheckboxGroupField.module.scss";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNewTag } from "@store/mapPoints/reducer";
import { selectActiveTags } from "@store/mapPoints/selectors";

import styles from "./styles/PlaceFilter.module.scss";

export default function PlaceFilter() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation("tags");

    const tags = useAppSelector(selectActiveTags);

    const filterRoutes = useCallback((newTag: ExtendedTagsEnum) => {
        dispatch(setNewTag(newTag));
    }, [dispatch]);

    const tagsOptions = useMemo(() => Object.values(ExtendedTagsEnum).map((attribute) => ({
        value: attribute,
        displayText: t(`tags:${attribute.toLowerCase()}`)
    })), [t]);

    return (
        <div className={styles.container}>
            {tagsOptions.map((option) => (
                <Checkbox
                    className={checkboxGroupStyles.checkbox}
                    label={option.displayText}
                    key={option.value}
                    onChange={() => filterRoutes(option.value)}
                    checked={tags.includes(option.value)}
                />
            ))}
        </div>
    );
}
