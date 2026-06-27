import { stringNullUndefinedOrEmpty } from "../stringHelpers";
import { UserSignInDto } from "../types/apiReturnTypes";
import { clearUserStore, setUserStore, setUserStoreFromResponse, userStore } from "../userStore";
import { api } from "./api";

export const apiRefreshToken = async () => {
    const existingRefreshToken = localStorage.getItem("refreshToken");
    const storedEmail = localStorage.getItem("email");
    console.log("Refresh token: " + existingRefreshToken);
    if (!stringNullUndefinedOrEmpty(existingRefreshToken) && !stringNullUndefinedOrEmpty(storedEmail)) {
        try {
            const response = await api.post<UserSignInDto>("/auth/refresh", {
                token: existingRefreshToken,
                userEmail: storedEmail
            });

            if (response.status !== 200) {
                throw new Error("Refresh token invalid.")
            }

            const data = response.data;

            setUserStoreFromResponse(storedEmail, data);
        } catch (e) {
            clearUserStore();
        }
    }
}

export const apiCheckStatus = async () => {
    const authToken = userStore.accessToken;

    try {
        if (!stringNullUndefinedOrEmpty(authToken)) {
            const response = await api.get("/auth/status", {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            });

            if (response.status === 200) {
                setUserStore("loggedIn", true);
            } else {
                throw new Error("Invalid token.")
            }
            
            
        } else {
            throw new Error("Token missing.")
        }
    } catch (e) {
        console.log("Error during status check.", e);
    }
}

export const apiSignIn = async (email: string, password: string) => {
    try {   
        const response = await api.post<UserSignInDto>("/auth/signin", {
            email, 
            password
        });

        if (response.status === 200) {
            const data = response.data;
            setUserStoreFromResponse(email, data);
        }

        return response.status;
    } catch (e) {
        console.log("Error occured during sign in post.", e);
    }
}