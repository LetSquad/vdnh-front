import i18n from "@i18n";

export function getDistanceLocalization(distance?: number) {
    if (!distance) {
        return null;
    }

    if (distance < 1000) {
        return i18n.t("base:distance.meters", { count: Number.parseInt((distance).toFixed(0), 10) });
    }

    return i18n.t(
        "base:distance.kilometers",
        {
            distance: Number.parseFloat((distance / 1000).toFixed(1)),
            count: Math.trunc(distance / 1000)
        }
    );
}

export function getTimeLocalization(time?: number) {
    if (!time) {
        return null;
    }

    const minutesRouteTime = Number.parseInt((time / 60).toFixed(0), 10);

    if (minutesRouteTime < 60) {
        return i18n.t("base:time.minutes", { count: minutesRouteTime });
    }

    const hours = Math.trunc(minutesRouteTime / 60);

    return i18n.t(
        "base:time.totalTime",
        {
            minutes: minutesRouteTime - hours * 60,
            hours: Math.trunc(minutesRouteTime / 60)
        }
    );
}
