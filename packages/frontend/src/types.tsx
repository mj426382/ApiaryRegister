export interface Apiary {
  name: string
  date: Date
  number: number
}

export type DateFormat = Date | ((prevState: Date) => Date) | null
