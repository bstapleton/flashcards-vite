export enum QuestionType {
    MultipleChoice = 'multiple',
    SingleChoice = 'single',
    Statement = 'statement'
}

export const getQuestionTypeName = (questionType: QuestionType) => {
    switch (questionType) {
        case QuestionType.Statement:
            return 'Statement';
        case QuestionType.SingleChoice:
            return 'Single correct answer';
        case QuestionType.MultipleChoice:
            return 'One or more correct answers';
        default:
            return 'Unknown';
    }
}