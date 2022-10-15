import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "@components/App/App";
import { BASENAME } from "@coreUtils/constants";
import WithErrorBoundaries from "@coreUtils/WithErrorBoundaries";
import { store } from "@store/index";

import "@coreStyles/globals.scss";

createRoot(document.querySelector("#root") as Element).render(
    <WithErrorBoundaries>
        <BrowserRouter basename={BASENAME}>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </WithErrorBoundaries>
);
