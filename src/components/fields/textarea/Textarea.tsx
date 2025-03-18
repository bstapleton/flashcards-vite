import styles from './Textarea.module.css'

type TextareaProps = {
    label: string;
    id: string;
    validationRule?: string;
    hint?: string;
}

export default function Textarea(props: TextareaProps) {
    return (
        <div className={styles.field}>
            <label
                htmlFor={props.id}
                className={styles.label}>
                {props.label}
            </label>
            {props.hint ? (
                <>
                    <textarea
                           id={props.id}
                           className={styles.input}
                           aria-describedby={props.id + '-hint'}
                    />
                    <p id={props.id + '-hint'} className={styles.hint}>
                        {props.hint}
                    </p>
                </>
            ) : (
                <textarea
                    id={props.id}
                    className={styles.input}
                />
            )}
        </div>
    )
}