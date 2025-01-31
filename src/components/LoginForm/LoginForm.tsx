import {useState} from 'react';
import {IError} from "../error/IError.ts";
import {Link, useNavigate} from "react-router";
import {Error} from "../error/Error.tsx";
import styles from "./LoginForm.module.css";
import {ILoginForm} from "./ILoginForm.ts";

const LoginForm = ({ title }: ILoginForm) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<IError | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

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

    if (isLoading) return <div>Loading...</div>

    return (
        <form className={styles.card}>
            <header>
                <h1>{title ?? 'Login'}</h1>
            </header>
            <div className={styles.body}>
                <div className={styles.bodyFull}>
                    <ul className={'list-none'}>
                        <li className={'mb-2'}>
                            <label htmlFor={'username'} className={'block'}>Username</label>
                            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </li>
                        <li className={'mb-2'}>
                            <label htmlFor={'password'} className={'block'}>Password</label>
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </li>
                        <li className={'mb-2'}>
                            Not yet registered? <Link className={'link'} to={'/register'}>Register here</Link>
                        </li>
                    </ul>

                    {error ?
                        <Error title={error.title} message={error.message} code={error.code} />
                        : null}
                </div>
            </div>
            <footer>
                <button name={'submit'} type={'button'} onClick={postLogin}>Login</button>
            </footer>
        </form>
    );
}

export default LoginForm;