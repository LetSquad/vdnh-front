import { createRoot } from "react-dom/client";
import { toast, ToastBar, Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import App from "@components/App/App";
import WithErrorBoundaries from "@coreUtils/WithErrorBoundaries";
import { store } from "@store/index";

import "@coreStyles/globals.scss";
import i18n from "@i18n";

import styles from "./styles/index.module.scss";

createRoot(document.querySelector("#root") as Element).render(
    <WithErrorBoundaries>
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
                <Toaster
                    position="bottom-right"
                    gutter={8}
                    toastOptions={{
                        className: styles.toast,
                        success: {
                            duration: 10_000
                        },
                        error: {
                            duration: 10_000
                        }
                    }}
                >
                    {(t) => (
                        <ToastBar toast={t}>
                            {({ icon, message }) => (
                                <>
                                    {icon}
                                    {message}
                                    {t.type !== "loading" && (
                                        <Icon
                                            name="remove"
                                            className={styles.toastDismissIcon}
                                            onClick={() => toast.dismiss(t.id)}
                                            link
                                            size="large"
                                        />
                                    )}
                                </>
                            )}
                        </ToastBar>
                    )}
                </Toaster>
            </BrowserRouter>
        </I18nextProvider>
    </WithErrorBoundaries>
);
