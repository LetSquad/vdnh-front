import { useMemo } from "react";

import { useMediaQuery } from "react-responsive";
import { SemanticWIDTHSNUMBER } from "semantic-ui-react";

import { useEditFlipCardBaseColumnsWidth } from "@hooks/useEditFlipCardBaseColumnsWidth";

export function useEditFlipCardAdditionalColumnsWidth() {
    const isMobile = useMediaQuery({ maxWidth: 649 });

    const baseColumnsWidth = useEditFlipCardBaseColumnsWidth();

    const columnWidthFirstLevel = useMediaQuery({ maxWidth: 400 });
    const columnWidthSecondLevel = useMediaQuery({ minWidth: 401, maxWidth: 605 });
    const columnWidthThirdLevel = useMediaQuery({ minWidth: 606, maxWidth: 650 });
    const columnWidthFourthLevel = useMediaQuery({ minWidth: 651, maxWidth: 950 });
    const columnWidthFifthLevel = useMediaQuery({ minWidth: 951, maxWidth: 1150 });
    const columnWidthSixthLevel = useMediaQuery({ minWidth: 1151, maxWidth: 1350 });

    const additionalColumnsWidth = useMemo<[SemanticWIDTHSNUMBER, SemanticWIDTHSNUMBER]>(() => {
        if (columnWidthFirstLevel) {
            return [8, 8];
        }
        if (columnWidthSecondLevel) {
            return [7, 9];
        }
        if (columnWidthThirdLevel) {
            return [6, 10];
        }
        if (columnWidthFourthLevel) {
            return [5, 11];
        }
        if (columnWidthFifthLevel) {
            return [4, 12];
        }
        if (columnWidthSixthLevel) {
            return [3, 13];
        }
        return [2, 14];
    }, [
        columnWidthFifthLevel,
        columnWidthFirstLevel,
        columnWidthFourthLevel,
        columnWidthSecondLevel,
        columnWidthSixthLevel,
        columnWidthThirdLevel
    ]);

    return isMobile ? baseColumnsWidth : additionalColumnsWidth;
}
