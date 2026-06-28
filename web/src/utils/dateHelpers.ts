import { stringNullUndefinedOrEmpty } from "./stringHelpers";

export const convertStringToDate = (dateString: string | null) => {
    if (stringNullUndefinedOrEmpty(dateString)) {
        return null;
    }
    
    const normalize = dateString.trim().replace("T", " ");

    return new Date(normalize);
}