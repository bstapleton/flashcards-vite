import {Correctness} from "../../types/correctness.ts";
import {QuestionType} from "../../types/questionType.ts";
import {IAttempt} from "./IAttempt.ts";
import {Difficulty} from "../../types/difficulty.ts";
import {IFlashcardAnswer} from "./IFlashcardAnswer.ts";

export interface IScorecard {
    question: string;
    type: QuestionType;
    correctness: Correctness;
    previous_attempt: IAttempt;
    score: number;
    user_current_score: number;
    old_difficulty: Difficulty;
    new_difficulty: Difficulty;
    next_eligible_at: Date;
    flashcard_answers: IFlashcardAnswer[];
}

export interface ScorecardProps {
    onNextQuestion: () => void;
}