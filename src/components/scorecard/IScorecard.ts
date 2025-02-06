import {Correctness} from "../../types/correctness.ts";
import {QuestionType} from "../../types/questionType.ts";
import {Difficulty} from "../../types/difficulty.ts";
import {IGivenAnswer} from "./IGivenAnswer.ts";

export interface IScorecard {
    question: string;
    type: QuestionType;
    correctness: Correctness;
    score: number;
    user_current_score: number;
    old_difficulty: Difficulty;
    new_difficulty: Difficulty;
    next_eligible_at: Date;
    flashcard_answers: IGivenAnswer[];
}

export interface ScorecardProps {
    onNextQuestion: () => void;
}