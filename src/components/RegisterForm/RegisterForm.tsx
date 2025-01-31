import {useState} from 'react';
import {IError} from "../error/IError.ts";
import {Error} from "../error/Error.tsx";
import {Link} from "react-router";
import styles from "./RegisterForm.module.css";
import {IRegisterForm} from "./IRegisterForm.ts";

const RegisterForm = ({ title }: IRegisterForm) => {
    const [isLoading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [error, setError] = useState<IError | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

    async function postRegister() {
        setLoading(true);
        try {
            const result = await fetch(import.meta.env.VITE_API_URL + '/api/register', {
                method: 'POST',
                headers: {
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    password_confirmation: passwordConfirmation,
                    display_name: displayName
                })
            })
            const data = await result.json();

            if (data.code) {
                setError(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setShowForm(false);
        }
    }

    function checkPasswordsMatch(){
        if (password === passwordConfirmation) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <form className={styles.card}>
            <header>
                <h1>{title ?? 'Register'}</h1>
            </header>
            <div className={styles.bodyFull}>
                {showForm ? (
                    <div>
                        <div className={styles.field}>
                            <label htmlFor={'username'} className={'block'}>Username</label>
                            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <span className={'block italic'}>This is unique to you. Do not use your email address.</span>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor={'password'} className={'block'}>Password</label>
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className={'block italic'}>Do not use a password you have used elsewhere. To help with this, we strongly recommend a password manager.</span>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor={'password_confirmation'} className={'block'}>Password confirmation</label>
                            <input id="password_confirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} onBlur={checkPasswordsMatch} />
                            {passwordsMatch === false ? <span className={'block italic'}>Passwords do not match.</span> : null}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor={'display_name'} className={'block'}>Display name</label>
                            <input id="display_name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                            <span className={'block italic'}>This should be different from your username, since it will protect you from bad actors. Your display name will be used when sharing your progress with others, or when engaging in team-based learning (when the feature eventually gets added).</span>
                        </div>
                        {error ?
                            <Error title={error.title} message={error.message} code={error.code} />
                        : null}
                    </div>
                ) : (
                    <div>
                        <h2>Registered successfully!</h2>
                        <p><Link to={'/login'}>Click here ot log in</Link></p>
                    </div>
                )}
            </div>
            <footer>
                <div className={styles.field}>
                    <button name={'submit'} type={'button'} disabled={passwordsMatch !== true} onClick={postRegister}>Register</button>
                </div>
            </footer>
        </form>
    );
}

export default RegisterForm;