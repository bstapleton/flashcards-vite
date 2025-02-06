import {IScorecard} from "./IScorecard.ts";
import {IGivenAnswer} from "./IGivenAnswer.ts";
import styles from './Scorecard.module.css';
import {QuestionType} from "../../types/questionType.ts";
import {Check} from "../glyphs/check.tsx";
import {Colour} from "../../types/colour.ts";
import {Times} from "../glyphs/times.tsx";
import {Minus} from "../glyphs/minus.tsx";
import {useTranslation} from "react-i18next";

interface ScorecardProps {
    handleSubmission: () => void
    data: IScorecard
}

const Scorecard = ({ handleSubmission, data }: ScorecardProps) => {
    const { t } = useTranslation();
    const handleSubmit = () => {
        handleSubmission();
    }

    return (
        <article className={styles.card}>
            <header>
                <h1>{t('scorecard')}</h1>
                <p>{t('total_points')}: {data.user_current_score}</p>
            </header>
            <div className={styles.bodyFull}>
                <h3 className={styles.question}>{data.question}</h3>
                <p>{t('type')}: {t(`types.` + data.type)}</p>
                <p>{t('correctness')}: {t(`correctness_matrix.` + data.correctness)}</p>
                <p>{t('score')}: {data.score}</p>
                <p>{t('difficulty_when_answered')}: {t(data.old_difficulty)}</p>
                <p>{t('new_difficulty')}: {t(data.new_difficulty)}</p>
                <p>{t('earliest_you_will_see_this_question_again')}: {data.next_eligible_at ? new Date(Date.parse(data.next_eligible_at.toString())).toLocaleString() : null}</p>
            </div>
            {data.type !== QuestionType.Statement ? (
                <div className={styles.bodyFull}>
                    (<Check symbolOnly={true} small={true} colour={Colour.GREEN} /> {t('correct_selection')}) (<Times symbolOnly={true} small={true} colour={Colour.RED} /> {t('incorrect_selection')}) (<Minus symbolOnly={true} small={true} colour={Colour.YELLOW} /> {t('correct_but_not_selected')})
                    <ul>
                        {data.flashcard_answers.map((flashcardAnswer: IGivenAnswer) => (
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
            <footer>
                <button onClick={handleSubmit}>{t('next_question')}</button>
            </footer>
        </article>
    )
}

export default Scorecard;