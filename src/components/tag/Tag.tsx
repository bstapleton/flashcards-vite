import {ITag} from "./ITag.ts";
import styles from './Tag.module.scss';


export const Tag = (props: ITag) => {
    return (
        <li className={styles.tag + ` ${styles[props.colour]}`}>
            {props.name}
        </li>
    )
}