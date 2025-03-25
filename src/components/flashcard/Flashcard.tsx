import {useEffect, useState} from 'react';
import {QuestionType} from "../../types/questionType.ts";
import {IAnswer} from "../answer/IAnswer.ts";
import {Answer} from "../answer/Answer.tsx";
import {ITag} from "../tag/ITag.ts";
import styles from './Flashcard.module.css';
import {Tag} from "../tag/Tag.tsx";
import {IFlashcard} from "./IFlashcard.ts";
import {useTranslation} from "react-i18next";

interface FlashcardProps {
    handleSubmission: (id: number) => void
    data: IFlashcard
}

const Flashcard = ({ handleSubmission, data }: FlashcardProps) => {
    const { t } = useTranslation();
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(JSON.parse(localStorage.getItem('selectedAnswers') || '[]'));

    useEffect(() => {
        localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    }, [selectedAnswers]);

    // Push selected answer IDs to localStorage
    const handleAnswerClick: (id: number) => void = (id: number): void => {
        if (data.type === QuestionType.MultipleChoice) {
            if (!selectedAnswers.includes(id)) {
                setSelectedAnswers([...selectedAnswers, id]);
            } else {
                setSelectedAnswers(selectedAnswers.filter(answer => answer !== id));
            }
        } else {
            setSelectedAnswers([id]);
        }
    }

    const handleSubmit: () => void = (): void => {
        handleSubmission(data.id);
    }

    return (
        <article className={styles.card}>
            <header>
                <h1>{data.text}</h1>
            </header>
            <div className={styles.bodyFull}>
                {data.type === QuestionType.Statement ?
                    <ul>
                        <Answer id={1} text={t('true')} onClick={handleAnswerClick} isSelected={selectedAnswers.includes(1)} />
                        <Answer id={0} text={t('false')} onClick={handleAnswerClick} isSelected={selectedAnswers.includes(0)} />
                    </ul>
                    :
                    <ul>
                        {data.answers.map((answer: IAnswer) => (
                            <Answer key={answer.id} id={answer.id} text={answer.text} onClick={handleAnswerClick} isSelected={selectedAnswers.includes(answer.id)} />
                        ))}
                    </ul>
                }
            </div>
            <footer>
                <ul className={styles.list}>
                    <li>{t('type')}: {t(`types.` + data.type)}</li>
                    <li>{t('difficulty')}: {t(data.difficulty)}</li>
                    {data.tags ?
                        <li>
                            <ul className={'flex'}>
                                <li>Tags:</li>
                                {data.tags.map((tag: ITag) => (
                                    <Tag key={tag.name} name={tag.name} colour={tag.colour}/>
                                ))}
                            </ul>
                        </li>
                    : null }
                </ul>
                <button className={'button'} onClick={handleSubmit}>{t('submit_answer')}</button>
            </footer>
        </article>
    )
}

export default Flashcard;