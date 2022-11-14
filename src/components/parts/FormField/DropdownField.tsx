import { useMemo, useState } from "react";

import classNames from "classnames";
import { useField } from "formik";
import { Form } from "semantic-ui-react";

import { DropdownFieldProps } from "@models/forms/types";

import styles from "./styles/DropdownField.module.scss";

export default function DropdownField({
    name,
    className,
    label,
    placeholder,
    required = false,
    options,
    search = false,
    allowAdditions = false,
    clearable = false,
    multiple = false
}: DropdownFieldProps) {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<string | undefined>({ name, type: "select" });

    const [addedItem, setAddedItem] = useState<string>();

    const fullOptions = useMemo(
        () => (addedItem ? [...options, { value: addedItem, text: addedItem }] : options),
        [addedItem, options]
    );

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    return (
        <Form.Dropdown
            label={label}
            value={value === undefined || value === null ? "" : value}
            options={fullOptions}
            onChange={(_event, data) => setValue(data.value as string)}
            onBlur={(_event, data) => {
                setValue(data.value as string);
                setTouched(true);
            }}
            onAddItem={(_event, data) => {
                setAddedItem(data.value as string);
                setValue(data.value as string);
            }}
            placeholder={placeholder}
            required={required}
            error={isErrorDisplay ? error : undefined}
            selection
            search={search}
            allowAdditions={allowAdditions}
            additionLabel=""
            clearable={clearable}
            className={classNames(styles.dropdown, className)}
            multiple={multiple}
        />
    );
}
