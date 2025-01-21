import {Correctness} from "../../types/correctness.ts";
import {QuestionType} from "../../types/questionType.ts";
import {IAttempt} from "./IAttempt.ts";
import {Difficulty} from "../../types/difficulty.ts";
import {IFlashcardAnswer} from "./IFlashcardAnswer.ts";

export interface IScorecard {
    question: string;
    type: QuestionType;
    correctness: Correctness;
    previousAttempt: IAttempt;
    score: number;
    userCurrentScore: number;
    oldDifficulty: Difficulty;
    newDifficulty: Difficulty;
    nextEligibleAt: Date;
    flashcardAnswers: IFlashcardAnswer[];
}

export interface ScorecardProps {
    onNextQuestion: () => void;
}