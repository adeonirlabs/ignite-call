export const getWeekDays = () => {
  return Array.from(Array(7).keys())
    .map(day => new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date(2021, 0, day + 3)))
    .map(day => day.charAt(0).toUpperCase() + day.slice(1))
}

export const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}
