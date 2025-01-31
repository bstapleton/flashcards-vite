import {IScorecard} from "./IScorecard.ts";
import {IFlashcardAnswer} from "./IFlashcardAnswer.ts";
import styles from './Scorecard.module.css';
import {getQuestionTypeName, QuestionType} from "../../types/questionType.ts";
import {Check} from "../glyphs/check.tsx";
import {Colour} from "../../types/colour.ts";
import {Times} from "../glyphs/times.tsx";
import {Minus} from "../glyphs/minus.tsx";

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
                <h1>Your Scorecard</h1>
                <p>Total points: {data.user_current_score}</p>
            </header>
            <div className={styles.bodyFull}>
                <h3 className={styles.question}>{data.question}</h3>
                <p>Type: {getQuestionTypeName(data.type)}</p>
                <p>Correctness: {data.correctness}</p>
                <p>Score: {data.score}</p>
                <p>Difficulty when answered: {data.old_difficulty}</p>
                <p>New difficulty: {data.new_difficulty}</p>
                <p>Earliest you'll see this question again: {data.next_eligible_at ? new Date(Date.parse(data.next_eligible_at.toString())).toLocaleString() : null}</p>
            </div>
            {data.type !== QuestionType.Statement ? (
                <div className={styles.bodyFull}>
                    (<Check symbolOnly={true} small={true} colour={Colour.GREEN} /> correct selection) (<Times symbolOnly={true} small={true} colour={Colour.RED} /> incorrect selection) (<Minus symbolOnly={true} small={true} colour={Colour.YELLOW} /> correct but not selected)
                    <ul>
                        {data.flashcard_answers.map((flashcardAnswer: IFlashcardAnswer) => (
                            <li key={flashcardAnswer.id} className={styles.answer}>
                                {flashcardAnswer.was_selected && flashcardAnswer.is_correct ? (
                                    <Check symbolOnly={false} colour={Colour.GREEN} />
                                ) : null}

                                {flashcardAnswer.was_selected && !flashcardAnswer.is_correct ? (
                                    <Times symbolOnly={false} colour={Colour.RED} />
                                ) : null}

                                {!flashcardAnswer.was_selected && flashcardAnswer.is_correct ? (
                                    <Minus symbolOnly={false} colour={Colour.YELLOW} />
                                ) : null}
                                <div className={styles.text}>
                                    <span className={'font-bold'}>{flashcardAnswer.text}</span>
                                    {flashcardAnswer.explanation ? (
                                        <span><br />{flashcardAnswer.explanation}</span>
                                    ) : null}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
            {data.previous_attempt.attemptedAt ? (
                <div className={styles.body}>
                    <h3 className={styles.previous}>Previous attempt</h3>
                    <p>At: {data.previous_attempt.attemptedAt.toString()}</p>
                    <p>Correctness: {data.previous_attempt.correctness}</p>
                </div>
            ) : null}
            <footer>
                <button onClick={handleSubmit}>Next question</button>
            </footer>
        </article>
    )
}

export default Scorecard;