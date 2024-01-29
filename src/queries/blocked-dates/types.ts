export type ListBlockedDatesRequest = {
  username: string
  year: string
  month: string
}

export type ListBlockedDatesResponse = {
  blockedWeekDays: number[]
  blockedDates: number[]
}
