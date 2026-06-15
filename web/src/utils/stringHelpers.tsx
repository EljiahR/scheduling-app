export const stringNullUndefinedOrEmpty = (x?: string | null) => (typeof x == "undefined"  || x === null || x === "");
