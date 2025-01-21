import styles from './icon.module.scss';

export const Outline = () => {
    return(
        <path className={styles.outline} d="M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Zm0,95A45,45,0,1,1,95,50,45,45,0,0,1,50,95Z" />
    )
}
