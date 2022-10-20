import { RootState } from "@store/index";

export const selectIsUserAuth = (state: RootState) => state.info.auth;
