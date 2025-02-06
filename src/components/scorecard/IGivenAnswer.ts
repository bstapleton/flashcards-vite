export interface IGivenAnswer {
    id: number;
    text: string;
    is_correct: boolean;
    was_selected: boolean;
    explanation?: string;
}