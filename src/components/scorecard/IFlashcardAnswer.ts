export interface IFlashcardAnswer {
    id: number;
    isCorrect: boolean;
    wasSelected: boolean;
    text: string;
    explanation?: string;
}