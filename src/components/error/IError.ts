import {ErrorCode} from "../../types/errorCode.ts";

export interface IError {
    title: string
    message: string
    code: ErrorCode
}