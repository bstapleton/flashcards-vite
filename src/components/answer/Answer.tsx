import {IAnswer} from "./IAnswer.ts";
import styles from './Answer.module.css';

export const Answer = (props: IAnswer) => {
    return (
        <li className={styles.answerItem}>
            <button
                key={props.id}
                type={'button'}
                className={'button ' + styles.answerButton + ` ${props.isSelected ? styles.selected : ''}`}
                onClick={() => props.onClick(props.id)}
                value={props.text}
                name={'answer'}
            >
                {props.text}
            </button>
        </li>
    )
}