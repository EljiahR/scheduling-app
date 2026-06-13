import axios from "axios";
import { setUserStore, userStore } from "./userStore";

const api = axios.create({
    baseURL: "undefined"
});

export const apiRefreshToken = async () => {
    const existingRefreshToken = userStore.refreshToken;
    if (existingRefreshToken !== null && existingRefreshToken !== "") {
        try {
            const response = await api.post("/auth/refresh", {
                body: userStore.refreshToken
            });

            if (response.status !== 200) {
                throw new Error("Refresh token invalid.")
            }

            const data = response.data;

            setUserStore("token", data["token"]);
            setUserStore("refreshToken", data["refreshToken"]);
        } catch (e) {
            setUserStore("token", "");
            setUserStore("refreshToken", "");
        }
        
    }
}

export default api;