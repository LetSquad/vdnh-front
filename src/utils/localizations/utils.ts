import i18n from "@i18n";

const KILOMETER = 1000;
const HOUR = 60;

export function getDistanceLocalization(distance?: number) {
    if (!distance) {
        return null;
    }

    if (distance < KILOMETER) {
        return i18n.t("base:distance.meters", { count: Number.parseInt((distance).toFixed(0), 10) });
    }

    return i18n.t(
        "base:distance.kilometers",
        {
            distance: Number.parseFloat((distance / KILOMETER).toFixed(1)),
            count: Math.trunc(distance / KILOMETER)
        }
    );
}

export function getTimeLocalization(time?: number) {
    if (!time) {
        return null;
    }

    const minutesRouteTime = Number.parseInt((time / HOUR).toFixed(0), 10);

    if (minutesRouteTime < HOUR) {
        return i18n.t("base:time.minutes", { count: minutesRouteTime });
    }

    const hours = Math.trunc(minutesRouteTime / HOUR);
    const minutes = minutesRouteTime - hours * HOUR;

    if (minutes === 0) {
        return i18n.t("base:time.hours", { count: hours });
    }

    return i18n.t(
        "base:time.totalTime",
        {
            minutes,
            hours
        }
    );
}
