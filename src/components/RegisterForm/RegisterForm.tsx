import {useState} from 'react';
import {IError} from "../error/IError.ts";
import {Error} from "../error/Error.tsx";
import {Link} from "react-router";
import styles from "./RegisterForm.module.css";
import {useTranslation} from 'react-i18next';
import TextInput from "../fields/text/TextInput.tsx";
import {TextFieldType} from "../fields/text/TextFieldType.ts";

const RegisterForm = () => {
    const { t } = useTranslation();
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

    if (isLoading) return <div>{t('loading')}</div>

    return (
        <form className={styles.card}>
            <header>
                <h1>{t('register')}</h1>
            </header>
            <div className={styles.bodyFull}>
                {showForm ? (
                    <div>
                        <TextInput
                            type={TextFieldType.text}
                            id={'username'}
                            hasHint={true}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextInput
                            type={TextFieldType.password}
                            id={'password'}
                            hasHint={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextInput
                            type={TextFieldType.password}
                            id={'password_confirmation'}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            onBlur={checkPasswordsMatch}
                        />
                        {passwordsMatch === false ? <span className={'block italic'}>{t('errors.password_mismatch')}</span> : null}

                        <TextInput
                            type={TextFieldType.text}
                            id={'display_name'}
                            hasHint={true}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />

                        {error ?
                            <Error title={error.title} message={error.message} code={error.code} />
                        : null}
                    </div>
                ) : (
                    <div>
                        <h2>{t('successful_registration')}</h2>
                        <p><Link to={'/login'} className={'underline text-primary :hover:text-primaryActive :hover:no-underline'}>{t('login')}</Link></p>
                    </div>
                )}
            </div>
            <footer>
                <div className={styles.field}>
                    <button className={'button'} name={'submit'} type={'button'} disabled={passwordsMatch !== true} onClick={postRegister}>{t('register')}</button>
                </div>
            </footer>
        </form>
    );
}

export default RegisterForm;