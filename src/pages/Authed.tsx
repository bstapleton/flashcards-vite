import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import styles from "../components/card/Card.module.css";

const Authed = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: { login: { value: boolean; }; }) => state.login.value);
    const isTrialUser = useSelector((state: { login: { isTrial: boolean; }; }) => state.login.isTrial);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, []);

    return (
        <main>
            <div className={styles.card}>
                <header>
                    <h1>{t('hello') + ' ' + localStorage.getItem('display_name') }</h1>
                </header>
                <div className={styles.bodyFull}>
                    {!isTrialUser ? (
                        <div>
                            <p>{t('features.advanced')}</p>
                            <ul className={'list-disc'}>
                                <li>{t('advanced_features.limit')}</li>
                                <li>{t('features.import')}</li>
                                <li>{t('advanced_features.limit')}</li>
                                <li>{t('features.review')}</li>
                                <li>{t('advanced_features.configure_timers')}</li>
                                <li>{t('advanced_features.export_attempts')}</li>
                                <li>{t('advanced_features.export_json')}</li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <p>{t('features.trial')}</p>
                            <ul className={'list-disc'}>
                                <li>{t('trial_features.limit')}</li>
                                <li>{t('features.import')}</li>
                                <li>{t('trial_features.learn')}</li>
                                <li>{t('features.review')}</li>
                            </ul>
                            <p>{t('after_trial_ends')}</p>
                            <ul className={'list-disc'}>
                                <li>{t('advanced_features.limit')}</li>
                                <li>{t('advanced_features.limit')}</li>
                                <li>{t('advanced_features.configure_timers')}</li>
                                <li>{t('advanced_features.export_attempts')}</li>
                                <li>{t('advanced_features.export_json')}</li>
                            </ul>
                        </div>
                    )}
                </div>
                <footer>
                    <a className={'link'} href={'/learn'}>{t('learn')}</a>
                    <a className={'link'} href={'/create'}>{t('create_questions')}</a>
                    <a className={'link'} href={'/import'}>{t('import')}</a>
                    <a className={'link'} href={'/profile'}>{t('profile')}</a>
                </footer>
            </div>
        </main>
    );
}

export default Authed;