export function stringNullUndefinedOrEmpty(x: string | null | undefined): x is null | undefined | "" {
    return typeof x == "undefined"  || x === null || x === "";
}
