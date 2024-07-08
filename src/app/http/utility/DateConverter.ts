export const DateConverter = async (date) => {
    const start = new Date(date).getTime();
    const end = Date.now();
    const daysBetween = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
    const year = daysBetween / 365;

    if (year >= 1) return `${year.toFixed(0)} Years`;

    const month = daysBetween / 30;
    if (month >= 1) return `${month.toFixed(0)} Months`;

    return `${daysBetween} Days`;
}