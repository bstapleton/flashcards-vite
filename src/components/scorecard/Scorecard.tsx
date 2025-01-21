import {IScorecard} from "./IScorecard.ts";
import {IFlashcardAnswer} from "./IFlashcardAnswer.ts";
import styles from './Scorecard.module.css';
import {getQuestionTypeName} from "../../types/questionType.ts";

interface ScorecardProps {
    handleSubmission: () => void
    data: IScorecard
}

const Scorecard = ({ handleSubmission, data }: ScorecardProps) => {
    const handleSubmit = () => {
        handleSubmission();
    }

    return (
        <article className={styles.card}>
            <header>
                <h2>Your Scorecard</h2>
                <p>Total points: {data.userCurrentScore}</p>
            </header>
            <div className={styles.body}>
                <h3 className={styles.question}>{data.question}</h3>
                <p>Type: {getQuestionTypeName(data.type)}</p>
                <p>Correctness: {data.correctness}</p>
                <p>Score: {data.score}</p>
                <p>Difficulty when answered: {data.oldDifficulty}</p>
                <p>New difficulty: {data.newDifficulty}</p>
                <p>Earliest you'll see this question again: {data.nextEligibleAt ? new Date(Date.parse(data.nextEligibleAt.toString())).toLocaleString() : null}</p>
                {/* TODO: stylise */}
                <ul>
                    {data.flashcardAnswers.map((flashcardAnswer: IFlashcardAnswer) => (
                        <li key={flashcardAnswer.id}>
                            <p>{flashcardAnswer.text}</p>
                            <p>{flashcardAnswer.isCorrect}</p>
                            <p>{flashcardAnswer.wasSelected}</p>
                            <p>{flashcardAnswer.explanation}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {data.previousAttempt.attemptedAt ?
                <div className={styles.body}>
                    <h3 className={styles.previous}>Previous attempt</h3>
                    <p>At: {data.previousAttempt.attemptedAt?.toString()}</p>
                    <p>Correctness: {data.previousAttempt?.correctness}</p>
                </div>
            : null}
            <footer>
                <button onClick={handleSubmit}>Next question</button>
            </footer>
        </article>
    )
}

export default Scorecard;