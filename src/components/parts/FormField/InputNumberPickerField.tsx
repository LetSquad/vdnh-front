import { useCallback, useMemo } from "react";

import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

import { InputNumberPickerFieldProps } from "@models/forms/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import Input from "@parts/Inputs/Input";

import styles from "./styles/InputNumberPickerField.module.scss";

export default function InputNumberPickerField({
    name,
    label,
    className,
    placeholder,
    required = false,
    min = 0,
    max = 100,
    step = 1
}: InputNumberPickerFieldProps) {
    const [{ value }, { error, touched }, { setValue }] = useField<number | undefined>(name);

    const incrementValue = useMemo(() => (value !== undefined ? value + step : 0), [step, value]);
    const decrementValue = useMemo(() => (value !== undefined ? value - step : 0), [step, value]);

    const increment = useCallback(() => {
        if (incrementValue <= max) {
            setValue((incrementValue));
        }
    }, [incrementValue, max, setValue]);

    const decrement = useCallback(() => {
        if (decrementValue >= min) {
            setValue((decrementValue));
        }
    }, [decrementValue, min, setValue]);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    return (
        <Form.Field
            error={isErrorDisplay}
            required={required}
            className={className}
        >
            {label && <label htmlFor={name}>{label}</label>}
            <PrimaryButton
                icon="angle left"
                type="button"
                onClick={decrement}
                disabled={decrementValue < min}
                className={styles.button}
            />
            <Input
                id={name}
                name={name}
                value={value === undefined || value === null ? "" : value}
                placeholder={placeholder}
                disabled
                className={styles.input}
            />
            <PrimaryButton
                icon="angle right"
                type="button"
                onClick={increment}
                disabled={incrementValue > max}
                className={styles.button}
            />
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
