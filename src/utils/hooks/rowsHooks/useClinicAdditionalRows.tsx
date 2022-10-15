import { lazy, useCallback } from "react";

import { useEditFlipCardAdditionalColumnsWidth } from "@hooks/useEditFlipCardAdditionalColumnsWidth";
import { ClinicFieldsName } from "@models/clinic/enums";
import { Clinic } from "@models/clinic/types";

const CardRow = lazy(/* webpackChunkName: "CardRow" */ () => import("@parts/CardParts/CardRow"));

export default function useClinicAdditionalRows() {
    const additionalColumnsWidth = useEditFlipCardAdditionalColumnsWidth();

    return useCallback(
        (clinic: Clinic) => {
            const { address, description } = clinic;

            return [
                address
                    ? (
                        <CardRow
                            key={ClinicFieldsName.ADDRESS}
                            title="Адрес"
                            value={address}
                            columnsWidth={additionalColumnsWidth}
                        />
                    )
                    : undefined,
                description
                    ? (
                        <CardRow
                            key={ClinicFieldsName.DESCRIPTION}
                            title="Описание"
                            value={description}
                            columnsWidth={additionalColumnsWidth}
                        />
                    )
                    : undefined
            ].filter((_row) => !!_row) as JSX.Element[];
        },
        [additionalColumnsWidth]
    );
}
