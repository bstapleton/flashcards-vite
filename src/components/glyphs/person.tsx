import styles from './icon.module.scss';
import {Outline} from "./outline";
import {IIcon} from "./IIcon.ts";

export const Person = ({ symbolOnly, colour, small }: IIcon) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.icon + ` ${styles[colour.toString()]} ${small ? styles.small : ''}`}>
            {!symbolOnly ?
                <Outline />
            : null}
            <g>
                <path d="M61.79,47.91H60a15,15,0,1,0-20.35,0H37.79a10,10,0,0,0-10,10v16a4,4,0,0,0,4,4h36a4,4,0,0,0,4-4v-16A10,10,0,0,0,61.79,47.91Zm-12-21a10,10,0,1,1-10,10A10,10,0,0,1,49.79,26.91Zm17,46h-34v-15a5,5,0,0,1,5-5h24a5,5,0,0,1,5,5Z"/>
            </g>
        </svg>
    )
}
