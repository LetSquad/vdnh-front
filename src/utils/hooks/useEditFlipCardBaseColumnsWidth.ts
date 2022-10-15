import { useMemo } from "react";

import { useMediaQuery } from "react-responsive";
import { SemanticWIDTHSNUMBER } from "semantic-ui-react";

export function useEditFlipCardBaseColumnsWidth() {
    const columnWidthFirstLevel = useMediaQuery({ maxWidth: 400 });
    const columnWidthSecondLevel = useMediaQuery({ minWidth: 401, maxWidth: 605 });
    const columnWidthThirdLevel = useMediaQuery({ minWidth: 606, maxWidth: 650 });
    const columnWidthFourthLevel = useMediaQuery({ minWidth: 651, maxWidth: 950 });
    const columnWidthFifthLevel = useMediaQuery({ minWidth: 951, maxWidth: 1150 });
    const columnWidthSixthLevel = useMediaQuery({ minWidth: 1151, maxWidth: 1350 });

    return useMemo<[SemanticWIDTHSNUMBER, SemanticWIDTHSNUMBER]>(() => {
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
            return [8, 8];
        }
        if (columnWidthFifthLevel) {
            return [7, 9];
        }
        if (columnWidthSixthLevel) {
            return [6, 10];
        }
        return [5, 11];
    }, [
        columnWidthFifthLevel,
        columnWidthFirstLevel,
        columnWidthFourthLevel,
        columnWidthSecondLevel,
        columnWidthSixthLevel,
        columnWidthThirdLevel
    ]);
}
