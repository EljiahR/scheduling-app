import { stringNullUndefinedOrEmpty } from "./stringHelpers";

export const convertStringToDate = (dateString: string | null) => {
    if (stringNullUndefinedOrEmpty(dateString)) {
        return null;
    }

    return new Date(dateString);
}

export const dateToPunchFormat = (date: Date | null | undefined) => {
    if (date === null || date === undefined) {
        return null;
    }
    
    const formatter = Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' })
    
    return formatter.format(date); 
}

export const dateToTimeCardHeaderFormat = (date: Date | null | undefined) => {
    if (date === null || date === undefined) {
        return null;
    }

    const formatter = Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'numeric', day: 'numeric'})
    return formatter.format(date); 
}