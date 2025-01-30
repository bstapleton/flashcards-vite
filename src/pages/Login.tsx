import {useState} from 'react';
import {IError} from "../components/error/IError.ts";
import {useNavigate} from "react-router";
import {Error} from "../components/error/Error.tsx";

const Login = () => {
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
        <main>
            <h1>Login</h1>
            <ul className={'list-none'}>
                <li className={'mb-2'}>
                    <label htmlFor={'username'} className={'block'}>Username</label>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </li>
                <li className={'mb-2'}>
                    <label htmlFor={'password'} className={'block'}>Password</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </li>
                <li className={'mb-2'}>
                    <button name={'submit'} type={'button'} onClick={postLogin}>Login</button>
                </li>
            </ul>

            {error ?
                <Error title={error.title} message={error.message} code={error.code} />
            : null}
        </main>
    );
}

export default Login;