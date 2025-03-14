import styles from './TextInput.module.css'

type TextInputProps = {
    label: string;
    id: string;
    validationRule: string;
    hint?: string;
}

export default function TextInput(props: TextInputProps) {
    return (
        <div className={styles.field}>
            <label
                htmlFor={props.id}
                className={styles.label}>
                {props.label}
            </label>
            {props.hint ? (
                <>
                    <input type="text"
                           id={props.id}
                           className={styles.input}
                           aria-describedby={props.id + '-hint'}
                    />
                    <p id={props.id + '-hint'} className={styles.hint}>
                        {props.hint}
                    </p>
                </>
            ) : (
                <input type="text"
                        id={props.id}
                    className={styles.input}
                />
            )}
        </div>
    )
}