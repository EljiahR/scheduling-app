import { stringNullUndefinedOrEmpty } from "./stringHelpers";

export const convertStringToDate = (dateString: string | null) => {
    if (stringNullUndefinedOrEmpty(dateString)) {
        return null;
    }

    return new Date(dateString);
}

export const dateToPunchFormat = (date: Date | null) => {
    if (date === null) {
        return null;
    }
    
    const formatter = Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    
    return formatter.format(date); 
}