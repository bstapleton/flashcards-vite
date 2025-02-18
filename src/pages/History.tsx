import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {IError} from "../components/error/IError.ts";
import {Error} from "../components/error/Error.tsx";
import {useSelector} from "react-redux";
import {IAttempt} from "../components/attempt/IAttempt.ts";
import {Attempt} from "../components/attempt/Attempt.tsx";

function History() {
    const [isLoading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState<IAttempt[] | null>(null);
    const [error, setError] = useState<IError | null>(null);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: { login: { value: boolean; }; }) => state.login.value);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            getAttempts();
        }
    }, []);

    const getAttempts = async () => {
        if (isLoading) return;
        setLoading(true);
        try {
            const result = await fetch(import.meta.env.VITE_API_URL + '/api/attempts', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                },
                cache: 'no-store'
            });
            const data = await result.json();

            if (data.data) {
                const attempts: IAttempt[] = data.data;

                setAttempts(attempts);
            } else {
                setError(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!localStorage.getItem('token')) return <div>Please login first!</div>

    if (isLoading) return <div>Loading...</div>

    return (
        <main>
            <h1>Attempt history</h1>
            {attempts ? (
                attempts.map((attempt: IAttempt) => (
                    <Attempt
                        key={attempt.id}
                        id={attempt.id}
                        question={attempt.question}
                        correctness={attempt.correctness}
                        question_type={attempt.question_type}
                        difficulty={attempt.difficulty}
                        points_earned={attempt.points_earned}
                        answered_at={attempt.answered_at}
                        answers_given={attempt.answers_given}
                        keywords={attempt.keywords}
                        older_attempts={attempt.older_attempts}
                        newer_attempts={attempt.newer_attempts}
                    />
                ))
            ) : null}
            {error ? (
                <Error title={error.title} message={error.message} code={error.code} />
            ) : null}
        </main>
    )
}

export default History