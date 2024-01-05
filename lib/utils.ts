export const logOutandClearCache = () => {
  localStorage.clear()
  location.reload()
}

// Function to format the time as "08:53 AM"
export function formatTime(timeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  return new Date(timeString).toLocaleTimeString('en-US', options)
}

// Function to format the time as "03:53 PM"
export function formatTime24(timeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(timeString).toLocaleTimeString('en-US', options)
}

// Function to display "Yesterday" if the date is yesterday, otherwise format as "MM/DD/YYYY"
export function formatDate(dateString: string): string {
  const currentDate: Date = new Date()
  const date: Date = new Date(dateString)

  if (date.toDateString() === currentDate.toDateString()) {
    return 'Today'
  } else if (
    date.toDateString() ===
    new Date(currentDate.getTime() - 86400000).toDateString()
  ) {
    return 'Yesterday'
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }
}

// Function to format the day of the week as "Thursday"
export function formatDayOfWeek(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export function getCurrentDayOfWeek(): string {
  const currentDate: Date = new Date()
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
  return currentDate.toLocaleDateString('en-US', options)
}

export function getOwner(userMail: string): string {
  let name_part: string = userMail.split('@')[0]
  if (name_part.length > 10) {
    name_part = name_part.substring(0, 10) + '...'
  }
  return name_part
}
