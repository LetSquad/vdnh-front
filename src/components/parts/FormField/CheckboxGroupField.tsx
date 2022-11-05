import { useCallback, useMemo } from "react";

import { useField } from "formik";
import { Checkbox, Form, Label } from "semantic-ui-react";

import { CheckboxGroupFieldProps } from "@models/forms/types";

import styles from "./styles/CheckboxGroupField.module.scss";

export default function CheckboxGroupField({
    name,
    label,
    className,
    required = false,
    options
}: CheckboxGroupFieldProps) {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<string[]>(name);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    const onClick = useCallback((_value: string) => {
        const index = value.indexOf(_value);
        if (index > -1) {
            value.splice(index, 1);
        } else {
            setValue([_value, ...value]);
        }

        setTouched(true);
    }, [setTouched, setValue, value]);

    return (
        <Form.Field
            error={isErrorDisplay}
            required={required}
            className={className}
        >
            {label && <label htmlFor={name}>{label}</label>}
            <div className={styles.container}>
                {options.map((option) => (
                    <Checkbox
                        className={styles.checkbox}
                        label={option.displayText}
                        key={option.value}
                        onChange={() => onClick(option.value)}
                        checked={value.includes(option.value)}
                    />
                ))}
            </div>
            {isErrorDisplay && (
                <Label
                    pointing
                    prompt
                >
                    {error}
                </Label>
            )}
        </Form.Field>
    );
}
