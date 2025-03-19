import styles from "./ToggleButton.module.css";
import {IToggleButton} from "./IToggleButton.ts";

type ToggleButtonProps = {
    onClick: (id: string) => void
    data: IToggleButton
}

export const ToggleButton = ({ onClick, data }: ToggleButtonProps)=> {
    return (
        <button
            id={data.id}
            type={'button'}
            className={'button buttonBar ' + styles.toggle + ` ${data.enabled ? styles.enabled : ''}`}
            onClick={() => onClick(data.id)}
        >
            {data.label}
        </button>
    )
}