import {useEffect, useState} from 'react';
import styles from "../components/card/Card.module.css";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {ErrorCode} from "../types/errorCode.ts";
import {IError} from "../components/error/IError.ts";
import {Error} from "../components/error/Error.tsx";

const Import = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [count, setCount] = useState<number>(0);
    const [remaining, setRemaining] = useState<number|null>(0);
    const [error, setError] = useState<IError | null>(null);
    const isLoggedIn = useSelector((state: { login: { value: boolean; }; }) => state.login.value);
    const isTrialUser = useSelector((state: { login: { isTrial: boolean; }; }) => state.login.isTrial);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            getCount();
        }
    }, []);

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

    return (
        <main>
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
                    {remaining === 0 ? (
                        <p>{t('import_zero_remaining')}</p>
                    ): (
                        <p>{t('import_instructions', {actualRemaining: remaining && remaining < 10 ? remaining : 10})}</p>
                    )}
                </div>
                <footer>
                    <ul className={'flex'}>
                        <li className={'mr-4'}><button value={'dogs'}>{t('import_topics.dogs')}</button></li>
                        <li className={'mr-4'}><button value={'literature'}>{t('import_topics.literature')}</button></li>
                        <li className={'mr-4'}><button value={'physics'}>{t('import_topics.physics')}</button></li>
                    </ul>
                </footer>
            </div>
        </main>
    );
}

export default Import;