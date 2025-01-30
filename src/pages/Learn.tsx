import Flashcard from "../components/flashcard/Flashcard.tsx";
import Scorecard from "../components/scorecard/Scorecard.tsx";
import {useEffect, useRef, useState} from "react";
import {IFlashcard} from "../components/flashcard/IFlashcard.ts";
import {IScorecard} from "../components/scorecard/IScorecard.ts";
import {IAnswer} from "../components/answer/IAnswer.ts";
import {IError} from "../components/error/IError.ts";
import {Error} from "../components/error/Error.tsx";

function Learn() {
    const [isLoading, setLoading] = useState(false);
    const [flashcard, setFlashcard] = useState<IFlashcard | null>(null);
    const [scorecard, setScorecard] = useState<IScorecard | null>(null);
    const [error, setError] = useState<IError | null>(null);
    const mountedRef = useRef(false);

    useEffect(() => {
        if (mountedRef.current) return;
        mountedRef.current = true;
        getQuestion();
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
                    'Authorization': 'Bearer ' + import.meta.env.VITE_API_BEARER,
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
            // TODO: get bearer token from localStorage on successful login
            const result = await fetch(import.meta.env.VITE_API_URL + '/api/flashcards/random', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + import.meta.env.VITE_API_BEARER,
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                },
                cache: 'no-store'
            });
            const data = await result.json();

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