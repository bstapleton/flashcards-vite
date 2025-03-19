import {IToggleButton} from "../togglebutton/IToggleButton.ts";
import styles from "./ButtonGroup.module.css";
import {ToggleButton} from "../togglebutton/ToggleButton.tsx";
import {useState} from "react";

type ButtonGroupProps = {
    buttons: IToggleButton[]
}

export default function ButtonGroup(props: ButtonGroupProps) {
    const [buttons, setButtons] = useState(props.buttons);

    const handleSelect: (id: string) => void = (id: string) => {
        setButtons(buttons.map(button => {
            if (button.id === id) {
                return {
                    ...button,
                    enabled: !button.enabled
                };
            }
            return button;
        }))
    }

    // TODO: doesn't work correctly if you want only one button to be selectable at a time

    return (
        <div className={styles.buttonGroup}>
            {buttons.map((button: IToggleButton) => (
                <ToggleButton onClick={handleSelect} data={
                    {
                        id: button.id,
                        label: button.label,
                        enabled: button.enabled
                    }
                } key={button.id} {...button} />
            ))}
        </div>
    )
}