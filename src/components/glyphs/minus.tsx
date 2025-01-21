import styles from './icon.module.scss';
import {Outline} from "./outline";
import {IIcon} from "./IIcon.ts";

export const Minus = ({ symbolOnly, colour, small }: IIcon) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.icon + ` ${styles[colour.toString()]} ${small ? styles.small : ''}`}>
            {!symbolOnly ?
                <Outline />
            : null}
            <g>
                <rect x="45" y="25" width="10" height="50" rx="5" ry="5" transform="translate(0 100) rotate(-90)"/>
            </g>
        </svg>
    )
}
