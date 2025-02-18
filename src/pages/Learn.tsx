import Flashcard from "../components/flashcard/Flashcard.tsx";
import Scorecard from "../components/scorecard/Scorecard.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {IFlashcard} from "../components/flashcard/IFlashcard.ts";
import {IScorecard} from "../components/scorecard/IScorecard.ts";
import {IAnswer} from "../components/answer/IAnswer.ts";
import {IError} from "../components/error/IError.ts";
import {Error} from "../components/error/Error.tsx";
import {useSelector} from "react-redux";
import {ErrorCode} from "../types/errorCode.ts";

function Learn() {
    const [isLoading, setLoading] = useState(false);
    const [flashcard, setFlashcard] = useState<IFlashcard | null>(null);
    const [scorecard, setScorecard] = useState<IScorecard | null>(null);
    const [error, setError] = useState<IError | null>(null);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: { login: { value: boolean; }; }) => state.login.value);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            getQuestion();
        }
    }, []);

    /**
     * Posts the selected answer array to the API for a given question to be cored and returns a scorecard
     *
     * @param id
     */
    async function postAnswers(id: number) {
        setLoading(true);
        try {
            const result = await fetch(import.meta.env.VITE_API_URL + '/api/flashcards/' + id, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                },
                cache: 'no-store',
                body: JSON.stringify({
                    answers: JSON.parse(localStorage.getItem('selectedAnswers') || '[]')
                })
            });
            const data = await result.json();
            setScorecard(data.data);
            setFlashcard(null);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Gets a new random question to display
     */
    const getQuestion = async () => {
        if (isLoading) return;
        setLoading(true);
        try {
            const result = await fetch(import.meta.env.VITE_API_URL + '/api/flashcards/random', {
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
                const flashcard: IFlashcard = data.data;

                // Randomise the answer order to be shown
                flashcard.answers = data.data.answers.map((value: number) => ({value, sort: Math.random()}))
                    .sort((a: { sort: number; }, b: { sort: number; }) => a.sort - b.sort)
                    .map(({value}: { value: IAnswer; }) => value);

                setFlashcard(flashcard);
            } else {
                setError(data);
            }

            setScorecard(null);

            localStorage.setItem('selectedAnswers', JSON.stringify([]));
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
            {scorecard ? (
                <Scorecard handleSubmission={getQuestion} data={scorecard} />
            ) : null}
            {flashcard ? (
                <Flashcard handleSubmission={postAnswers} data={flashcard} />
            ) : null}
            {error ? (
                <Error title={error.title} message={error.message} code={error.code} />
            ) : null}
        </main>
    )
}

export default Learn