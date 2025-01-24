import {IError} from "./IError.ts";
import styles from './Error.module.css';

export const Error = (props: IError) => {
    return (
        <article className={styles.card}>
            <header>
                <h2>{props.title}</h2>
            </header>
            <div className={styles.body}>
                <p>{props.message}</p>
            </div>
        </article>
    )
}