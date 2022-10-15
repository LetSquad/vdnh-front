import { lazy, useCallback } from "react";

import { useEditFlipCardBaseColumnsWidth } from "@hooks/useEditFlipCardBaseColumnsWidth";
import { ClinicFieldsName } from "@models/clinic/enums";
import { Clinic } from "@models/clinic/types";

const CardRow = lazy(/* webpackChunkName: "CardRow" */ () => import("@parts/CardParts/CardRow"));

export default function useClinicBaseRows() {
    const baseColumnsWidth = useEditFlipCardBaseColumnsWidth();

    return useCallback(
        (clinic: Clinic) => {
            const {
                email,
                phoneNumbers,
                site,
                startWork,
                endWork
            } = clinic;

            return [
                <CardRow
                    key={ClinicFieldsName.EMAIL}
                    title="Электронная почта"
                    value={email}
                    columnsWidth={baseColumnsWidth}
                />,
                <CardRow
                    key={ClinicFieldsName.PHONE}
                    title="Номер телефона"
                    value={phoneNumbers}
                    columnsWidth={baseColumnsWidth}
                />,
                <CardRow
                    key={ClinicFieldsName.SITE}
                    title="Сайт"
                    value={site}
                    columnsWidth={baseColumnsWidth}
                />,
                <CardRow
                    key={`${ClinicFieldsName.START_WORK}-${ClinicFieldsName.END_WORK}`}
                    title="Время работы"
                    value={startWork && endWork ? `${startWork} - ${endWork}` : undefined}
                    columnsWidth={baseColumnsWidth}
                />
            ];
        },
        [baseColumnsWidth]
    );
}
