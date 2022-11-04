import { useCallback, useEffect, useRef } from "react";

import classNames from "classnames";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import { FormFieldType } from "@models/forms/enums";
import { RouteFiltersFieldsName, RouteFiltersPeopleNumberFieldsName } from "@models/userRoutes/enums";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import styles from "./styles/PeopleNumberPicker.module.scss";

const ID = "people-number-picker";
const ADULT_ID = `${RouteFiltersFieldsName.PEOPLE_NUMBER}.${RouteFiltersPeopleNumberFieldsName.ADULT}`;
const KID_ID = `${RouteFiltersFieldsName.PEOPLE_NUMBER}.${RouteFiltersPeopleNumberFieldsName.KID}`;

export default function PeopleNumberPicker() {
    const { t } = useTranslation("userRoutes");

    const [groupVisible, toggleGroupVisible] = useToggle();

    const peopleCountPickerGroupRef = useRef<HTMLDivElement>(null);

    const [{ value: adultNumber }] = useField<string | undefined>(ADULT_ID);
    const [{ value: kidNumber }] = useField<string | undefined>(KID_ID);

    const handleClickOutside = useCallback((event: Event) => {
        if (peopleCountPickerGroupRef?.current && !peopleCountPickerGroupRef.current.contains(event.target as Node)) {
            toggleGroupVisible();
        }
    }, [toggleGroupVisible]);

    useEffect(() => {
        if (groupVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    return (
        <div>
            <div className={styles.fieldContainer}>
                <label
                    className={styles.fieldLabel}
                    htmlFor={ID}
                >
                    {t("userRoutes:filterForm.fields.peopleNumber.label")}
                </label>
                <div
                    aria-hidden
                    id={ID}
                    className={styles.field}
                    onClick={toggleGroupVisible}
                >
                    {t(
                        "userRoutes:filterForm.fields.peopleNumber.placeholder.adult",
                        { count: adultNumber ? Number.parseInt(adultNumber, 10) : 0 }
                    )}
                    {
                        kidNumber
                            ? ` ${t(
                                "userRoutes:filterForm.fields.peopleNumber.placeholder.kid",
                                { count: Number.parseInt(kidNumber, 10) }
                            )}`
                            : ""
                    }
                </div>
            </div>
            <div
                className={classNames({ [styles.groupInvisible]: !groupVisible, [styles.groupVisible]: groupVisible })}
                ref={peopleCountPickerGroupRef}
            >
                <WithSuspense loader={<FormFieldPlaceholder className={styles.fieldStart} />}>
                    <FormField
                        name={ADULT_ID}
                        type={FormFieldType.NUMBER_PICKER}
                        label={t("userRoutes:filterForm.fields.peopleNumber.adult.label")}
                        required
                        className={styles.pickerAdult}
                    />
                </WithSuspense>
                <WithSuspense loader={<FormFieldPlaceholder className={styles.fieldEnd} />}>
                    <FormField
                        name={KID_ID}
                        type={FormFieldType.NUMBER_PICKER}
                        label={t("userRoutes:filterForm.fields.peopleNumber.kid.label")}
                        required
                        className={styles.pickerKid}
                    />
                </WithSuspense>
            </div>
        </div>
    );
}
