import {QuestionType} from "../../types/questionType.ts";
import {Difficulty} from "../../types/difficulty.ts";
import {IAnswer} from "../answer/IAnswer.ts";
import {ITag} from "../tag/ITag.ts";

export interface IFlashcard {
    id: number
    text: string
    type: QuestionType
    difficulty: Difficulty
    lastSeenAt: Date | null
    eligibleAt: Date
    answers: IAnswer[]
    tags: ITag[]
    createdAt: Date
    handleSubmission: (id: number) => void
}