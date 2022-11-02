import { useCallback } from "react";
import * as React from "react";

import { Link, LinkProps } from "react-router-dom";

import { useAppDispatch } from "@store/hooks";
import { setMapPointsUnActive } from "@store/mapPoints/reducer";

export function LinkWithResetPlaceActive({ onClick, ...props }: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    const dispatch = useAppDispatch();

    const onLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        dispatch(setMapPointsUnActive());
        if (onClick) {
            onClick(event);
        }
    }, [dispatch, onClick]);

    return (
        <Link
            {...props}
            onClick={onLinkClick}
        />
    );
}
