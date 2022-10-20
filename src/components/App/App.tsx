import AppContent from "@components/App/AppContent";

import styles from "./styles/App.module.scss";

export default function App() {
    return (
        <div className={styles.app}>
            <AppContent />
        </div>
    );
}
