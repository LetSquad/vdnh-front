import { useCallback } from "react";

import { useAppDispatch } from "@store/hooks";
import { setAuth, setRole } from "@store/info/reducer";

export function useLogout() {
    const dispatch = useAppDispatch();

    return useCallback(() => {
        dispatch(setAuth(false));
        dispatch(setRole(undefined));
        localStorage.removeItem("pet_helper_role");
    }, [dispatch]);
}
