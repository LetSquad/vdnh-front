import { DateTime } from "luxon";

import { MapPointCategory } from "@models/mapPoints/enums";
import { BaseRoutesSlugs } from "@models/routes/enums";

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

export function getRouteByCategory(category: MapPointCategory) {
    switch (category) {
        case MapPointCategory.EVENT: {
            return BaseRoutesSlugs.EVENTS;
        }
        case MapPointCategory.PLACE: {
            return BaseRoutesSlugs.PLACES;
        }
        // skip default
    }
}
