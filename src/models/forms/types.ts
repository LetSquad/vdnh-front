import { LabelProps } from "semantic-ui-react/dist/commonjs/elements/Label";
import { SemanticCOLORS, SemanticShorthandItem } from "semantic-ui-react/dist/commonjs/generic";

import { FormFieldType } from "./enums";

export interface BaseFieldProps {
    name: string;
    className?: string;
    label?: string;
    placeholder?: string;
    nullAvatar?: string;
    required?: boolean;
    isLoading?: boolean;
    errorText?: string | JSX.Element;
    promptError?: boolean;
    basicError?: boolean;
    errorColor?: SemanticCOLORS;
    defaultValue?: string;
}

export interface BaseInputFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    clearable?: boolean;
    inputLabel?: SemanticShorthandItem<LabelProps>;
    labelPosition?: "left" | "right" | "left corner" | "right corner";
}

export interface NumberInputFieldProps extends BaseInputFieldProps {
    disabled: boolean;
    inputType: "number";
    max?: number;
    min?: number;
    step?: number;
}

export interface InputNumberPickerFieldProps extends BaseFieldProps {
    max?: number;
    min?: number;
    step?: number;
}

interface ButtonGroupFieldOptionsType {
    value: string;
    displayText: string;
}

export interface ButtonGroupFieldProps extends BaseFieldProps {
    options: ButtonGroupFieldOptionsType[];
    fluid?: boolean;
}

export type InputFieldProps = NumberInputFieldProps | BaseInputFieldProps;

export interface DatePickerFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    maxDate?: Date;
    minDate?: Date;
    dateFormat?: string;
}

export interface TimePickerFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    timeCaption?: string;
    timeFormat?: string;
    maxTime?: Date;
    minTime?: Date;
    timeIntervals?: number;
}

export type DateTimePickerFieldProps = BaseFieldProps & DatePickerFieldProps & TimePickerFieldProps & {
    includeTimes?: Date[];
    includeDates?: Date[];
};

export type FormFieldProps =
    (InputFieldProps & { type: FormFieldType.INPUT }) |
    (ButtonGroupFieldProps & { type: FormFieldType.BUTTON_GROUP }) |
    (InputNumberPickerFieldProps & { type: FormFieldType.NUMBER_PICKER }) |
    (DateTimePickerFieldProps & { type: FormFieldType.DATE_TIMEPICKER });

export interface AccordionsFormFieldProps {
    id: string;
    initActiveState?: boolean;
    accordionTitle: string;
    fields: FormFieldProps[];
}
