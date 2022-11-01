import { NavigateOptions } from "react-router/dist/lib/context";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@store/hooks";
import { setPlacesUnActive } from "@store/places/reducer";

import { To } from "@remix-run/router";

export function useNavigateWithResetPlaceActive() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return ({ to, options }: { to: To, options?: NavigateOptions }) => {
        dispatch(setPlacesUnActive());
        navigate(to, options);
    };
}
