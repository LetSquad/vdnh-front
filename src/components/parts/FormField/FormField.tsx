import { lazy, useMemo } from "react";

import { Form, Label } from "semantic-ui-react";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import DropdownField from "@parts/FormField/DropdownField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import Input from "../Inputs/Input";
import styles from "./styles/FormField.module.scss";

const InputNumberPickerField = lazy(/* webpackChunkName: "InputNumberPickerField" */ () => import("./InputNumberPickerField"));
const InputField = lazy(/* webpackChunkName: "InputField" */ () => import("./InputField"));
const DateTimePickerField = lazy(/* webpackChunkName: "DateTimePickerField" */ () => import("./DateTimePickerField"));
const ButtonGroupField = lazy(/* webpackChunkName: "ButtonGroupField" */ () => import("./ButtonGroupField"));
const CheckboxGroupField = lazy(/* webpackChunkName: "CheckboxGroupField" */ () => import("./CheckboxGroupField"));
const CheckboxField = lazy(/* webpackChunkName: "CheckboxField" */ () => import("./CheckboxField"));

export default function FormField({
    defaultValue,
    isLoading,
    errorText,
    basicError,
    promptError,
    errorColor,
    ...props
}: FormFieldProps) {
    const field = useMemo(() => {
        switch (props.type) {
            case FormFieldType.DATE_TIMEPICKER: {
                return <DateTimePickerField {...props} />;
            }
            case FormFieldType.INPUT: {
                return <InputField {...props} />;
            }
            case FormFieldType.NUMBER_PICKER: {
                return <InputNumberPickerField {...props} />;
            }
            case FormFieldType.BUTTON_GROUP: {
                return <ButtonGroupField {...props} />;
            }
            case FormFieldType.CHECKBOX_GROUP: {
                return <CheckboxGroupField {...props} />;
            }
            case FormFieldType.CHECKBOX: {
                return <CheckboxField {...props} />;
            }
            case FormFieldType.DROPDOWN: {
                return <DropdownField {...props} />;
            }
            // skip default
        }
    }, [props]);

    if (defaultValue || isLoading || errorText) {
        return (
            <Form.Field className={props.className}>
                <label
                    className={props.required ? styles.prepareFormFieldLabelRequired : undefined}
                    htmlFor={props.name}
                >
                    {props.label}
                </label>
                <Input
                    id={props.name}
                    disabled
                    placeholder={props.placeholder}
                    defaultValue={defaultValue}
                    loading={isLoading}
                />
                {errorText && (
                    <Label
                        pointing
                        prompt={promptError}
                        basic={basicError}
                        color={errorColor}
                    >
                        {errorText}
                    </Label>
                )}
            </Form.Field>
        );
    }

    return <WithSuspense loader={<FormFieldPlaceholder />}>{field}</WithSuspense>;
}
