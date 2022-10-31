import { useCallback } from "react";
import * as React from "react";

import { Link, LinkProps } from "react-router-dom";

import { useAppDispatch } from "@store/hooks";
import { setPlacesUnActive } from "@store/places/reducer";

export function LinkWithResetPlaceActive({ onClick, ...props }: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    const dispatch = useAppDispatch();

    const onLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        dispatch(setPlacesUnActive());
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
