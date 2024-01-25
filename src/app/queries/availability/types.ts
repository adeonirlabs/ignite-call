export type ListAvailabilitiesRequest = {
  username: string
  date?: string
}

export type ListAvailabilitiesResponse = {
  possibleTimes: number[]
  availableTimes: number[]
}
