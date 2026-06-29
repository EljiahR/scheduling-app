import { stringNullUndefinedOrEmpty } from "../stringHelpers";
import { Punch } from "../types/apiReturnTypes";
import { userStore } from "../userStore"
import { api } from "./api"

export const apiGetTimeCard = async () => {
    const authToken = userStore.accessToken;

    if (stringNullUndefinedOrEmpty(authToken)) {
        throw new Error("No access token.");
    }

    try {
        const response = await api.get<Punch[]>("/timecard", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Error retrieving timecard.");
        }
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const apiSendPunch = async (inPunch: boolean) => {
    const authToken = userStore.accessToken;

    if (stringNullUndefinedOrEmpty(authToken)) {
        throw new Error("No access token.");
    }

    try {
        const response = await api.get<Punch>(`/timecard/punch?inPunch=${inPunch}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    } catch (e) {
        console.log("Error during punch process.", e);
    }
}