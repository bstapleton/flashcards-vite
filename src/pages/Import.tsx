import {useEffect, useState} from 'react';
import styles from "../components/card/Card.module.css";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {ErrorCode} from "../types/errorCode.ts";
import {IError} from "../components/error/IError.ts";
import {Error} from "../components/error/Error.tsx";
import Modal from "../components/modal/Modal.tsx";
import ModalData from "../components/modal/ModalData.ts";

const Import = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(0);
    const [remaining, setRemaining] = useState<number|null>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ModalData[] | null>(null);
    const [error, setError] = useState<IError | null>(null);
    const isLoggedIn = useSelector((state: { login: { value: boolean; }; }) => state.login.value);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            getCount();
        }
    }, []);

    const closeModal = () => {
        setShowModal(false);
    }

    const getCount = async () => {
        if (isLoading) return;
        setLoading(true);
        try {
            const result = await fetch(import.meta.env.VITE_API_URL + '/api/user/count_questions', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                },
                cache: 'no-store'
            });
            const data = await result.json();

            // Session expired - let them know to log in again
            if (data.data.code === ErrorCode.UNAUTHENTICATED) {
                localStorage.removeItem('token');
            }

            if (data.data) {
                setCount(data.data.count);
                setRemaining(data.data.remaining);
            } else {
                setError(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const importTopic = async (topic: string) => {
        setLoading(true);
        try {
            const result = await fetch (import.meta.env.VITE_API_URL + '/api/flashcards/import?topic=' + topic, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                },
                cache: 'no-store'
            });
            const response = await result.json();

            // Session expired - let them know to log in again
            if (response.data.code === ErrorCode.UNAUTHENTICATED) {
                localStorage.removeItem('token');
            }

            if (response.data) {
                setCount(response.data.count);
                setRemaining(response.data.remaining);

                const x: ModalData = {
                    label: 'number_of_questions',
                    value: response.data.count
                };
                const y: ModalData = {
                    label: 'import_count',
                    value: response.data.imported
                }
                setModalData([x, y]) // TODO there has to be a neater way of doing this
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setShowModal(true);
        }
    }

    const redirectToLearningPage = () => {
        navigate('/learn')
    }

    return (
        <main>
            <>
                {showModal && (
                    <Modal
                        title={t('results')}
                        data={modalData ?? undefined}
                        actions={[
                            { label: 'close', onClick: closeModal },
                            { label: 'learn', onClick: redirectToLearningPage}
                        ]}
                    />
                )}
                <div className={styles.card}>
                    <header>
                        <h1>{t('import')}</h1>
                    </header>
                    <div className={styles.bodyFull}>
                        {error ? (
                            <Error title={error.title} message={error.message} code={error.code} />
                        ) : null}
                        <p>{t('import_intro')}</p>
                        {remaining !== null ? (
                            <p className={'callout'}>{t('import_stats', {count: count, remaining: remaining})}</p>
                        ): null}
                        {remaining !== 0 && (
                            <p>{t('import_instructions', {actualRemaining: remaining && remaining < 10 ? remaining : 10})}</p>
                        )}
                    </div>
                    <footer>
                        {remaining === 0 ? (
                            <p>{t('import_zero_remaining')}</p>
                        ) : (
                            <ul className={'flex'}>
                                <li className={'mr-4'}><button className={'button'} onClick={() => importTopic('dogs')}>{t('import_topics.dogs')}</button></li>
                                <li className={'mr-4'}><button className={'button'} onClick={() => importTopic('literature')}>{t('import_topics.literature')}</button></li>
                                <li className={'mr-4'}><button className={'button'} onClick={() => importTopic('physics')}>{t('import_topics.physics')}</button></li>
                            </ul>
                        )}
                    </footer>
                </div>
            </>
        </main>
    );
}

export default Import;