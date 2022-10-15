import { Suspense } from "react";

import { Loader } from "semantic-ui-react";

import partsStyles from "@coreStyles/baseParts.module.scss";

interface WithSuspenseProps {
    loader?: JSX.Element;
    children: JSX.Element | JSX.Element[];
}

export function WithSuspense({ children, loader }: WithSuspenseProps): JSX.Element {
    return (
        <Suspense
            fallback={
                loader || (
                    <div className={partsStyles.flexBaseCenterContainer}>
                        <Loader
                            active
                            inline="centered"
                        />
                    </div>
                )
            }
        >
            {children}
        </Suspense>
    );
}
