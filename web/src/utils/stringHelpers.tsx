export const stringNullUndefinedOrEmpty = (x?: string) => (typeof x == "undefined"  || x === null || x === "");
