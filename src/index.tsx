import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "@components/App/App";
import WithErrorBoundaries from "@coreUtils/WithErrorBoundaries";
import { store } from "@store/index";

import "@coreStyles/globals.scss";
import i18n from "@i18n";

createRoot(document.querySelector("#root") as Element).render(
    <WithErrorBoundaries>
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </I18nextProvider>
    </WithErrorBoundaries>
);
