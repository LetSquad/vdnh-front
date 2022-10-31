import classNames from "classnames";
import { Button } from "semantic-ui-react";
import { ButtonProps } from "semantic-ui-react/dist/commonjs/elements/Button/Button";

import styles from "./styles/InlineButton.module.scss";

export default function InlineButton({ className, active, ...props }: ButtonProps & { active?: boolean }) {
    return (
        <Button
            className={classNames(className, { [styles.buttonBase]: !active }, { [styles.buttonActive]: active })}
            {...props}
        />
    );
}
