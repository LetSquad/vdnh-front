export function capitalizeFirstLetter([first, ...rest]: string) {
    return first.toUpperCase() + rest.join("");
}
