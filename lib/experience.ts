// Calendar-year experience, based on the confirmed founding year (exact anniversary not supplied).
export function experienceYears(date = new Date()) {
  return (
    Number(
      new Intl.DateTimeFormat("en", {
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(date),
    ) - 2007
  );
}
