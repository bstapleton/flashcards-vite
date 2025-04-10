import styles from './TextInput.module.css'
import {TextFieldType} from "./TextFieldType.ts";
import React from "react";

type TextInputProps = {
    label: string;
    value?: string;
    type: TextFieldType
    id: string;
    validationRule?: string;
    hint?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export default function TextInput(props: TextInputProps) {
    const [value, setValue] = React.useState(props.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (props.onBlur) {
            props.onBlur(event);
        }
    };

    return (
        <div className={styles.field}>
            <label htmlFor={props.id} className={styles.label}>
                {props.label}
            </label>
            {props.hint ? (
                <>
                    <input type={props.type}
                           id={props.id}
                           className={styles.input}
                           value={value}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           aria-describedby={props.id + '-hint'}
                    />
                    <p id={props.id + '-hint'} className={styles.hint}>
                        {props.hint}
                    </p>
                </>
            ) : (
                <input type={props.type}
                       id={props.id}
                       value={value}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       className={styles.input}
                />
            )}
        </div>
    )
}