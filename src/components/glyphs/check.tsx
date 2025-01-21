import styles from './icon.module.scss';
import {Outline} from "./outline";
import {IIcon} from "./IIcon.ts";

export const Check = ({ symbolOnly, colour, small }: IIcon) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.icon + ` ${styles[colour.toString()]} ${small ? styles.small : ''}`}>
            {!symbolOnly ?
                <Outline />
            : null}
            <g>
                <path d="M73.57,32.32h0a5,5,0,0,0-7.07,0L41.76,57.06,33.5,48.8a5,5,0,0,0-7.06,0h0a5,5,0,0,0,0,7.06L38.25,67.69a5,5,0,0,0,7,0l3.54-3.55h0L73.57,39.39A5,5,0,0,0,73.57,32.32Z"/>
            </g>
        </svg>
    )
}
