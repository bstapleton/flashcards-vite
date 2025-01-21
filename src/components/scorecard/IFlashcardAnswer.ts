export interface IFlashcardAnswer {
    id: number;
    is_correct: boolean;
    was_selected: boolean;
    text: string;
    explanation?: string;
}