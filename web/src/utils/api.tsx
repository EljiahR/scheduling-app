import axios from "axios";
import { setUserStore, userStore } from "./userStore";
import { stringNullUndefinedOrEmpty } from "./stringHelpers";

const BASEURL = import.meta.env.VITE_API_URL;

if (stringNullUndefinedOrEmpty(BASEURL)) {
    console.log(BASEURL);
    throw new Error("VITE_API_URL is not defined.");
}

const api = axios.create({
    baseURL: BASEURL
});

export const apiRefreshToken = async () => {
    const existingRefreshToken = localStorage.getItem("refreshToken");
    if (existingRefreshToken !== null && existingRefreshToken !== "") {
        try {
            const response = await api.post("/auth/refresh", {
                refreshToken: existingRefreshToken
            });

            if (response.status !== 200) {
                throw new Error("Refresh token invalid.")
            }

            const data = response.data;

            setUserStore("token", data.token);
            // setUserStore("refreshToken", data.refreshToken);
            localStorage.setItem("refreshToken", data.refreshToken);
        } catch (e) {
            setUserStore("token", "");
            // setUserStore("refreshToken", "");
            localStorage.removeItem("refreshToken");
        }
        
    }
}

export const apiCheckStatus = async () => {
    const authToken = userStore.token;
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("Token: " + authToken);
    
    try {
        if (!stringNullUndefinedOrEmpty(authToken)) {
            const response = await api.post("/auth/status", { 
                refreshToken 
            }, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            });

            if (response.status !== 200) {
                throw new Error("Token is invalid");
            }

            setUserStore("loggedIn", true);
        } else {
            throw new Error("No token found.");
        }
    } catch (e) {
        throw e;
    }
}

export const apiSignIn = async (email: string, password: string) => {
    try {   
        const response = await api.post("/auth/signin", {
            email, 
            password
        });

        if (response.status === 200) {
            const data = response.data;
            
            setUserStore("loggedIn", true);
            setUserStore("token", data.token);
        }

        return response.status;
    } catch (e) {

    }
}

export default api;