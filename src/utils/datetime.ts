interface WeekDaysParams {
  short?: boolean
}

export const getWeekDays = ({ short = false }: WeekDaysParams = {}) => {
  return Array.from(Array(7).keys())
    .map(day => new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date(2021, 0, day + 3)))
    .map(day => (short ? day.charAt(0).toUpperCase() + day.slice(1, 3) : day.charAt(0).toUpperCase() + day.slice(1)))
}

export const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}
