import {useEffect, useRef, useState} from 'react';
import {IFlashcard} from "./IFlashcard.ts";
import {QuestionType} from "../../types/questionType.ts";
import {IAnswer} from "../answer/IAnswer.ts";
import {Answer} from "../answer/Answer.tsx";
import {ITag} from "../tag/ITag.ts";
import styles from './Flashcard.module.css';
import {Tag} from "../tag/Tag.tsx";

const Flashcard = () => {
    const [flashcard, setFlashcard] = useState<IFlashcard | null>(null);
    const [answers, setAnswers] = useState<IAnswer[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(JSON.parse(localStorage.getItem('selectedAnswers') || '[]'));

    const [error, setError] = useState(null);
    const hasRunEffectRef = useRef(false);

    useEffect(() => {
        localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    }, [selectedAnswers]);

    // Push selected answer IDs to localStorage
    const handleAnswerClick = (id: number) => {
        if (flashcard?.type === QuestionType.Statement) {
            setSelectedAnswers([id]);
        }

        if (flashcard?.type === QuestionType.SingleChoice) {
            setSelectedAnswers([id]);
        }

        if (flashcard?.type === QuestionType.MultipleChoice) {
            if (!selectedAnswers.includes(id)) {
                setSelectedAnswers([...selectedAnswers, id]);
            } else {
                setSelectedAnswers(selectedAnswers.filter(answer => answer !== id));
            }
        }
    }

    const getQuestionTypeName = () => {
        switch (flashcard?.type) {
            case QuestionType.Statement:
                return 'Statement';
            case QuestionType.SingleChoice:
                return 'Single correct answer';
            case QuestionType.MultipleChoice:
                return 'One or more correct answers';
            default:
                return 'Unknown';
        }
    }

    useEffect(() => {
        if (hasRunEffectRef.current) return;
        hasRunEffectRef.current = true; // Only hit the API once please

        async function getData() {
            try {
                // TODO: get bearer token from localStorage on successful login
                const result = await fetch(import.meta.env.VITE_API_URL + '/api/flashcards/random', {
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + import.meta.env.VITE_API_BEARER},
                    cache: 'no-store'
                });
                const data = await result.json(); // gross any, but not enough time to fix it right now
                const flashcard: IFlashcard = data.data;
                const answers: IAnswer[] = flashcard.answers;

                setFlashcard(flashcard);
                // Shuffle and set the answers array. Shuffle pinched from: https://stackoverflow.com/a/46545530
                setAnswers(answers.map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value))
                setSelectedAnswers([]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        getData();
    }, []);

    async function postAnswers() {
        try {
            const result = await fetch(import.meta.env.VITE_API_URL + '/api/flashcards/' + flashcard?.id, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + import.meta.env.VITE_API_BEARER,
                    'Content-Type': 'application/json'
                },
                cache: 'no-store',
                body: JSON.stringify({
                    answers: JSON.parse(localStorage.getItem('selectedAnswers') || '[]')
                })
            });
            const data = await result.json();
            localStorage.setItem('scorecard', JSON.stringify(data))
        } catch (error) {
            setLoading(false);
        }
        // TODO: change the UI somehow based on the response
    }

    if (isLoading) return <div>Loading...</div>

    if (flashcard) {
        return (
            <div className={styles.flashcard}>
                <header>
                    <h2 className={'text-2xl'}>{flashcard.text}</h2>
                </header>
                <div className={styles.flashcardBody}>
                    {flashcard.type === QuestionType.Statement ?
                        <ul>
                            <Answer id={1} text={'True'} onClick={handleAnswerClick} isSelected={selectedAnswers.includes(1)} />
                            <Answer id={0} text={'False'} onClick={handleAnswerClick} isSelected={selectedAnswers.includes(0)} />
                        </ul>
                        :
                        <ul>
                            {answers.map((answer: IAnswer) => (
                                <Answer id={answer.id} text={answer.text} onClick={handleAnswerClick} isSelected={selectedAnswers.includes(answer.id)} />
                            ))}
                        </ul>
                    }
                </div>
                <footer>
                    <ul>
                        <li className={'list-none mb-2'}>Type: {getQuestionTypeName()}</li>
                        <li className={'list-none mb-2'}>Difficulty: {flashcard.difficulty}</li>
                        <li className={'list-none mb-4'}>
                            <ul className={'flex'}>
                                <li>Tags:</li>
                                {flashcard.tags.map((tag: ITag) => (
                                    <Tag name={tag.name} colour={tag.colour}/>
                                ))}
                            </ul>
                        </li>
                    </ul>
                    <button className={'submitButton'} onClick={postAnswers}>Submit your answer</button>
                </footer>
            </div>
        )
    }

    return <div>Something went wrong...</div>
}

export default Flashcard;