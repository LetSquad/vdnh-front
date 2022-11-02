import classNames from "classnames";
import { Input as SemanticInput } from "semantic-ui-react";
import { InputProps } from "semantic-ui-react/dist/commonjs/elements/Input/Input";

import styles from "./styles/Input.module.scss";

export default function Input({ className, ...props }: InputProps) {
    return (
        <SemanticInput
            className={classNames(className, styles.input)}
            {...props}
        />
    );
}
