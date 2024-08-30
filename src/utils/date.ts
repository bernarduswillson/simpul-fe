// Date to Time
export const dateToTime = (date: string): string => {
  const newDate = new Date(date);

  const hours = String(newDate.getHours()).padStart(2, '0');
  const minutes = String(newDate.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

// Is Same Day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

// Format Date 1
export const formatDate1 = (date: string): string => {
  if (!date) return "Set Date";

  const newDate = new Date(date);

  const day = String(newDate.getDate()).padStart(2, "0");
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}

// Format Date 2
export const formatDate2 = (date: string): string => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.toLocaleString('default', { month: 'long' });
  const year = newDate.getFullYear();

  if (isSameDay(new Date(), newDate)) {
    return `Today, ${month} ${day}, ${year}`;
  }

  return `${month} ${day}, ${year}`;
}

// Calculate days between two dates
export const calculateDays = (date: string): string => {
  const newDate = new Date(date);
  const currentDate = new Date();

  const diffTime = newDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  if (diffDays < 0) return "Overdue";
  return `${diffDays} Days Left`;
};