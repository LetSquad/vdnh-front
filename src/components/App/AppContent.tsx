import { useMemo } from "react";

import { OverlayContext } from "@components/App/OverlayContext";
import Header from "@components/Header/Header";
import { useToggle } from "@hooks/useToogle";

import Routes from "@routes/Routes";

import styles from "./styles/AppContent.module.scss";

export default function AppContent() {
    const [isOverlay, toggleOverlay, setOverlayTrue, setOverlayFalse] = useToggle();

    const overlay = useMemo(() => (
        isOverlay
            ? (
                <div
                    id="overlay"
                    className={styles.overlay}
                />
            )
            : null
    ), [isOverlay]);

    const overlayContextValue = useMemo(
        () => ({
            isOverlay,
            toggleOverlay,
            setOverlayTrue,
            setOverlayFalse
        }),
        [isOverlay, setOverlayFalse, setOverlayTrue, toggleOverlay]
    );

    return (
        <OverlayContext.Provider value={overlayContextValue}>
            <Header />
            {overlay}
            <div className={styles.container}>
                <div className={styles.mainContentWrapper}>
                    <Routes />
                </div>
            </div>
        </OverlayContext.Provider>
    );
}
