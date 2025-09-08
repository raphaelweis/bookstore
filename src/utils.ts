/**
 * rawDate format expected: YYYY-MM-DD
 */
export function parseDate(rawDate: string): Date {
  const [year, month, day] = rawDate.split("-");

  return new Date(Date.UTC(parseInt(year), parseInt(month), parseInt(day)));
}
