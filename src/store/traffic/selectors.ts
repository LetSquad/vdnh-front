import { RootState } from "@store/index";

export const selectTraffic = (state: RootState) => state.traffic.traffic;

export const selectIsTrafficLoading = (state: RootState) => state.traffic.isTrafficLoading;
export const selectIsTrafficLoadingFailed = (state: RootState) => state.traffic.isTrafficLoadingFailed;
