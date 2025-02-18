import styles from "./Attempt.module.css";
import {IAttempt, IHistoricAttempt} from "./IAttempt.ts";
import {IGivenAnswer} from "../scorecard/IGivenAnswer.ts";
import {Colour} from "../../types/colour.ts";
import {Check} from "../glyphs/check.tsx";
import {Times} from "../glyphs/times.tsx";
import {useTranslation} from "react-i18next";

export const Attempt = (props: IAttempt) => {
    const { t } = useTranslation();
    const answers: IGivenAnswer[] = props.answers_given.filter((answer: IGivenAnswer) => answer.was_selected);

    return (
        <article className={`${styles.attempt} ${props.older_attempts.length ? styles.hasFooter : null}`}>
            <header>
                <h2>{props.question_type === 'statement' ? t('types.statement') : t('question') }: <span className={'font-bold'}>{props.question}</span></h2>
            </header>
            <div className={styles.bodyFull}>
                <ul className={styles.list}>
                    <li>Correctness: {props.correctness}</li>
                    <li>Difficulty: {props.difficulty}</li>
                    <li>Points Earned: {props.points_earned}</li>
                    <li>Answered At: {props.answered_at.toLocaleString()}</li>
                    <li>Tags: {props.keywords.map((keyword: string) => (<span className={styles.keyword} key={keyword}>{keyword}</span>))}</li>
                    {answers.length ? (
                        <li>Answers Given:
                            <ul className={styles.list}>
                                {answers.map((answer: IGivenAnswer) => (
                                    <li key={answer.id || answer.text}>
                                        {answer.text}
                                        {answer.is_correct
                                            ? <Check symbolOnly={true} small={true} colour={Colour.GREEN} />
                                            : <Times symbolOnly={true} small={true} colour={Colour.RED} />
                                        }
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ) : null}
                </ul>
            </div>
            {props.older_attempts.length ? (
                <footer>
                    <table className={styles.history}>
                        <thead>
                        <tr>
                            <th>Attempted at</th>
                            <th>Correctness</th>
                            <th>Points Earned</th>
                            <th>Difficulty</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.older_attempts.map((attempt: IHistoricAttempt) => (
                            <tr key={attempt.id}>
                                <td>{attempt.answered_at.toLocaleString()}</td>
                                <td>{attempt.correctness}</td>
                                <td>{attempt.points_earned}</td>
                                <td>{attempt.difficulty}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </footer>
            ) : null}
        </article>
    )
}