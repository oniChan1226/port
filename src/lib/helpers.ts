export const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

// console.log(formatter.format(new Date("2025-07-18T14:08:03Z"))); // "18 July 2025"
