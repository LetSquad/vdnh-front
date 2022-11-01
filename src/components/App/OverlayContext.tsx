import { createContext, useContext } from "react";

type OverlayContextType = {
    isOverlay: boolean;
    toggleOverlay: () => void;
    setOverlayTrue: () => void;
    setOverlayFalse: () => void;
};

export const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function useIsOverlay() {
    const context = useContext(OverlayContext);
    if (!context) {
        throw new Error("useIsOverlay must be used within a OverlayProvider");
    }
    return context.isOverlay;
}

export function useToggleOverlay() {
    const context = useContext(OverlayContext);
    if (!context) {
        throw new Error("useToggleOverlay must be used within a OverlayProvider");
    }
    return context.toggleOverlay;
}

export function useSetOverlayTrue() {
    const context = useContext(OverlayContext);
    if (!context) {
        throw new Error("useSetOverlayTrue must be used within a OverlayProvider");
    }
    return context.setOverlayTrue;
}

export function useSetOverlayFalse() {
    const context = useContext(OverlayContext);
    if (!context) {
        throw new Error("useSetOverlayFalse must be used within a OverlayProvider");
    }
    return context.setOverlayFalse;
}
