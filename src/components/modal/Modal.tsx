import {useTranslation} from "react-i18next";
import styles from './Modal.module.css';
import ModalData from "./ModalData.ts";

interface ModalProps {
    data?: ModalData[];
    title?: string;
    content?: string;
    actions?: { label: string; onClick: () => void }[];
}

export default function Modal({ data, title, content, actions }: ModalProps) {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.wrapper}></div>
            <div aria-hidden={true} className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.container}>
                        {title && <header>{title}</header>}
                        <div className={styles.content}>
                            {data ? (
                                    <ul>
                                        {data.map((x: any) => (<li key={x.label}>{t(x.label)}: {x.value}</li>))}
                                    </ul>
                                ) :
                                content && <p>{content}</p>
                            }
                        </div>
                        <div className={styles.actions}>
                            {actions && actions.map((action, index) => (
                                <button key={index} onClick={action.onClick}>
                                    {t(action.label)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}