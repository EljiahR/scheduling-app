import { stringNullUndefinedOrEmpty } from "../stringHelpers";
import { userStore } from "../userStore"
import { api } from "./api"

export const apiSendPunch = async (inPunch: boolean) => {
    const authToken = userStore.accessToken;

    if (stringNullUndefinedOrEmpty(authToken)) {
        throw new Error("No access token.");
    }

    try {
        const response = await api.get(`/timecard/punch?inPunch=${inPunch}`, {
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