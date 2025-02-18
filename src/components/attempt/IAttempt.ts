import {QuestionType} from "../../types/questionType.ts";
import {Difficulty} from "../../types/difficulty.ts";
import {IGivenAnswer} from "../scorecard/IGivenAnswer.ts";
import {Correctness} from "../../types/correctness.ts";

export interface IAttempt {
    id: number
    question: string
    correctness: Correctness
    question_type: QuestionType
    difficulty: Difficulty
    points_earned: number
    answered_at: Date
    answers_given: IGivenAnswer[]
    keywords: string[],
    older_attempts: IAttempt[]
    newer_attempts: IAttempt[]
}

export interface IHistoricAttempt {
    id: number
    correctness: Correctness
    difficulty: Difficulty
    points_earned: number
    answered_at: Date
}