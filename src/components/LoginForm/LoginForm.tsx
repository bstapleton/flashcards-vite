import {useEffect, useState} from 'react';
import {IError} from "../error/IError.ts";
import {useNavigate} from "react-router";
import {Error} from "../error/Error.tsx";
import styles from "./LoginForm.module.css";
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/loginSlice.ts";
import TextInput from "../fields/text/TextInput.tsx";
import {TextFieldType} from "../fields/text/TextFieldType.ts";

const LoginForm = () => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<IError | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: { login: { value: boolean; }; }) => state.login.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/learn');
        }
    }, []);

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
                localStorage.setItem('display_name', data.display_name)
                localStorage.setItem('is_trial_user', data.is_trial_user)
                dispatch(login())
            } else {
                setError(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            if (localStorage.getItem('token')) {
                navigate('/authed');
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
                <TextInput
                    type={TextFieldType.text}
                    id={'username'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextInput
                    type={TextFieldType.password}
                    id={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error ?
                    <Error title={error.title} message={error.message} code={error.code}/>
                    : null}
            </div>
            <footer>
                <button className={'button'} name={'submit'} type={'button'} onClick={postLogin}>{t('login')}</button>
            </footer>
        </form>
    );
}

export default LoginForm;