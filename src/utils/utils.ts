import { DateTime } from "luxon";

export function capitalizeFirstLetter([first, ...rest]: string) {
    return first.toUpperCase() + rest.join("");
}

export function isSameDate(firstDay: DateTime, secondDay: DateTime) {
    return firstDay.day === secondDay.day && firstDay.month === secondDay.month && firstDay.year === secondDay.year;
}

export function roundTimeToMinutes(time: DateTime, round: number) {
    const remainder = round - (time.minute % round);

    return time.plus({ minute: remainder });
}
