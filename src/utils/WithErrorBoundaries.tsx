import * as React from "react";

import ErrorScreen from "./ErrorScreen";

export default class WithErrorBoundaries extends React.Component<
React.PropsWithChildren<{ children: JSX.Element }>,
{ error: Error | undefined }
> {
    constructor(props: React.PropsWithChildren<{ children: JSX.Element }>) {
        super(props);
        this.state = {
            error: undefined
        };
    }

    public static getDerivedStateFromError(error: Error) {
        return {
            error
        };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error);
        console.log(errorInfo);
    }

    public render() {
        if (this.state.error) {
            return <ErrorScreen error={this.state.error} />;
        }
        return this.props.children;
    }
}
