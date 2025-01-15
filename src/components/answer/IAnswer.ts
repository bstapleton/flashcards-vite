export interface IAnswer {
    id: number
    text: string
    onClick: (id: number) => void
    isSelected: boolean
}