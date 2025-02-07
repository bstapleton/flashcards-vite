import styles from "./Attempt.module.css";
import {IAttempt} from "./IAttempt.ts";
import {IGivenAnswer} from "../scorecard/IGivenAnswer.ts";
import {Colour} from "../../types/colour.ts";
import {Check} from "../glyphs/check.tsx";
import {Times} from "../glyphs/times.tsx";
import {useTranslation} from "react-i18next";

export const Attempt = (props: IAttempt) => {
    const { t } = useTranslation();

    return (
        <article className={styles.attempt}>
            <header>
                <h2>{props.question_type === 'statement' ? t('types.statement') : t('question') }: <span className={'font-bold'}>{props.question}</span></h2>
            </header>
            <div className={styles.bodyFull}>
                <ul className={styles.list}>
                    <li>Correctness: {props.correctness}</li>
                    <li>Type: {props.question_type}</li>
                    <li>Difficulty: {props.difficulty}</li>
                    <li>Points Earned: {props.points_earned}</li>
                    <li>Answered At: {props.answered_at.toLocaleString()}</li>
                    <li>Tags: {props.tags.join(', ')}</li>
                    <li>Answers Given:
                        <ul className={styles.list}>
                            {props.answers_given.filter((answer: IGivenAnswer) => answer.was_selected).map((answer: IGivenAnswer) => (
                                <li key={answer.id}>
                                    {answer.text}
                                    {answer.is_correct
                                        ? <Check symbolOnly={true} small={true} colour={Colour.GREEN} />
                                        : <Times symbolOnly={true} small={true} colour={Colour.RED} />
                                    }
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </article>
    )
}