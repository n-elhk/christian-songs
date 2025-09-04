function zeroPad(num: number, maxLength = 2): string {
  return String(num).padStart(maxLength, '0');
}

export function reverseDate(currentDate = new Date()): string {
  const y = currentDate.getFullYear();
  const m = zeroPad(currentDate.getMonth() + 1);
  const d = zeroPad(currentDate.getDate());
  return `${y}-${m}-${d}`;
}
