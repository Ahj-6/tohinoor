const monthsEn = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "1895-05-12" -> "12 – May – 1895"
export function formatBirthDate(isoDate) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  const monthName = monthsEn[Number(month) - 1] ?? month;
  return `${Number(day)} – ${monthName} – ${year}`;
}