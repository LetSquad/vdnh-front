import { useCallback, useMemo } from "react";

import classNames from "classnames";
import { useField } from "formik";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { Label } from "semantic-ui-react";

import { SupportedLocales } from "@coreUtils/localizations/locales_constants";
import { isSameDate } from "@coreUtils/utils";
import { DateTimePickerFieldProps } from "@models/forms/types";

import "./styles/DatePickerField.module.scss";

const { default: ru } = await import(/* webpackChunkName: "date-fns-ru" */ "date-fns/locale/ru");
const { default: en } = await import(/* webpackChunkName: "date-fns-en" */ "date-fns/locale/en-US");
const { default: cn } = await import(/* webpackChunkName: "date-fns-ch" */ "date-fns/locale/zh-CN");

const datePicker = await import(/* webpackChunkName: "react-datepicker" */ "react-datepicker");
const DatePicker = datePicker.default;

datePicker.registerLocale(SupportedLocales.RU, ru);
datePicker.registerLocale(SupportedLocales.EN, en);
datePicker.registerLocale(SupportedLocales.CN, cn);

export default function DateTimePickerField({
    name,
    label,
    className,
    placeholder,
    required = false,
    maxDate,
    minDate,
    dateFormat = "dd.MM.yyyy HH:mm",
    timeFormat = "HH:mm",
    timeCaption = "Время",
    timeIntervals = 30,
    includeTimes,
    includeDates,
    minTime,
    maxTime,
    filterTime,
    onChange: additionalOnChange
}: DateTimePickerFieldProps) {
    const { i18n: { language } } = useTranslation();

    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<string | undefined>({ name, type: "select" });

    const formatJSDate = useCallback((date: Date) => DateTime.fromJSDate(date).toISO(), []);

    const setTouchedTrue = useCallback(() => setTouched(true), [setTouched]);

    const changeDateTimeValue = useCallback((date: Date) => {
        const formatTime = formatJSDate(date);

        if (additionalOnChange) {
            additionalOnChange(formatTime);
        }

        setValue(formatTime);
    }, [additionalOnChange, formatJSDate, setValue]);

    const resetDateValue = useCallback(() => {
        if (includeTimes && value) {
            const valueDate = DateTime.fromISO(value);
            if (!includeTimes.some((includeTime) => DateTime.fromJSDate(includeTime) === valueDate)) {
                setValue(undefined);
            }
        }
    }, [includeTimes, setValue, value]);

    const includesTimesInDay = useMemo(
        () => {
            if (includeTimes && !value) {
                return [];
            }

            if (includeTimes && value) {
                return includeTimes.filter((includeTime) => isSameDate(DateTime.fromJSDate(includeTime), DateTime.fromISO(value)));
            }

            return undefined;
        },
        [includeTimes, value]
    );

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    return (
        <div
            className={classNames(
                "field",
                {
                    required,
                    error: isErrorDisplay
                },
                className
            )}
        >
            {label && (
                <label
                    htmlFor={name}
                    className="label"
                >
                    {label}
                </label>
            )}
            <DatePicker
                disabledKeyboardNavigation
                name={name}
                selected={!value ? undefined : DateTime.fromISO(value).toJSDate()}
                onSelect={changeDateTimeValue}
                onChange={changeDateTimeValue}
                maxDate={maxDate}
                minDate={minDate}
                showMonthDropdown
                showYearDropdown
                showTimeSelect
                locale={language}
                placeholderText={placeholder}
                dateFormat={dateFormat}
                timeFormat={timeFormat}
                timeCaption={timeCaption}
                timeIntervals={timeIntervals}
                required={required}
                includeTimes={includesTimesInDay}
                includeDates={includeDates}
                onClickOutside={resetDateValue}
                onBlur={setTouchedTrue}
                autoComplete="off"
                maxTime={maxTime}
                minTime={minTime}
                filterTime={filterTime}
            />
            {isErrorDisplay && (
                <Label
                    pointing
                    prompt
                >
                    {error}
                </Label>
            )}
        </div>
    );
}
