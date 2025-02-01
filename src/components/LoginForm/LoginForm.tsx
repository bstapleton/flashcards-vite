import {useState} from 'react';
import {IError} from "../error/IError.ts";
import {Link, useNavigate} from "react-router";
import {Error} from "../error/Error.tsx";
import styles from "./LoginForm.module.css";
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<IError | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function postLogin() {
        setLoading(true);
        try {
            const result = await fetch(import.meta.env.VITE_API_URL + '/api/login', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${username}:${password}`),
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                },
                cache: 'no-store',
            })
            const data = await result.json();

            if (data.token) {
                localStorage.setItem('token', data.token)
            } else {
                setError(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            if (localStorage.getItem('token')) {
                navigate('/learn');
            }
        }
    }

    if (isLoading) return <div>{t('loading')}</div>

    return (
        <form className={styles.card}>
            <header>
                <h1>{t('login')}</h1>
            </header>
            <div className={styles.bodyFull}>
                <ul className={'list-none'}>
                    <li className={'mb-2'}>
                        <label htmlFor={'username'} className={'block'}>{t('username')}</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </li>
                    <li className={'mb-2'}>
                        <label htmlFor={'password'} className={'block'}>{t('password')}</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </li>
                    <li className={'mb-2'}>
                        {t('not_registered')} <Link  className={'underline text-indigo-500 :hover:text-indigo-300 :hover:no-underline'} to={'/register'}>{t('register_here')}</Link>
                    </li>
                </ul>

                {error ?
                    <Error title={error.title} message={error.message} code={error.code} />
                : null}
            </div>
            <footer>
                <button name={'submit'} type={'button'} onClick={postLogin}>{t('login')}</button>
            </footer>
        </form>
    );
}

export default LoginForm;