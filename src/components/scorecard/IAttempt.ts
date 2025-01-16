import {Correctness} from "../../types/correctness.ts";

export interface IAttempt {
    attemptedAt?: Date
    correctness?: Correctness
}