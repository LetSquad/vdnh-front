export enum FormStep {
    FILTERS,
    ENTRANCE
}

export enum RouteFiltersFieldsName {
    DATE_TIME_START = "dateTimeStart",
    DATE_TIME_END = "dateTimeEnd",
    PEOPLE_NUMBER = "peopleNumber",
    POPULARITY = "popularity",
    DIFFICULTY = "difficulty",
    LOAD_FACTOR = "loadFactor",
    LOCATION_PLACEMENT = "locationPlacement",
    FOOD = "food",
    PAYMENT = "payment",
    MOVEMENT = "movement",
    TAGS = "tags",
    ENTRANCE = "entrance",
    EXIT = "exit"
}

export enum Popularity {
    POPULAR = "POPULAR",
    BALANCED = "BALANCED",
    HIDDEN = "HIDDEN"
}

export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}

export enum Payment {
    FREE = "FREE",
    CHEAP = "CHEAP",
    IRRELEVANT = "IRRELEVANT"
}

export enum Movement {
    WALKING = "WALKING",
    BICYCLE = "BICYCLE"
}

export enum LocationPlacement {
    INDOORS = "INDOORS",
    OUTSIDE = "OUTSIDE",
    IRRELEVANT = "IRRELEVANT"
}

export enum Tags {
    NATURE = "NATURE",
    ART = "ART",
    ANIMALS = "ANIMALS",
    ARCHITECTURE = "ARCHITECTURE",
    MOSCOW = "MOSCOW",
    TECH = "TECH",
    SPORT = "SPORT",
    HISTORY = "HISTORY"
}

export enum RouteFiltersPeopleNumberFieldsName {
    ADULT = "adult",
    KID = "kid"
}
