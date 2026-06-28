import { createStore } from "solid-js/store";
import { UserSignInDto } from "./types/apiReturnTypes";
import { convertStringToDate } from "./dateHelpers";

export const [userStore, setUserStore] = createStore({
    loggedIn: false,
    accessToken: "",
    userEmail: "",
    lastPunch: null as Date | null
});

export const setUserStoreFromResponse = (email: string, userInfo: UserSignInDto) => {
    setUserStore("accessToken", userInfo.accessToken);
    setUserStore("userEmail", email);
    const lastPunch = convertStringToDate(userInfo.lastPunch);
    if (lastPunch !== null) {
        setUserStore("lastPunch", lastPunch);
    }
    localStorage.setItem("email", email);
    localStorage.setItem("refreshToken", userInfo.refreshToken);
    setUserStore("loggedIn", true);
}

export const clearUserStore = () => {
    setUserStore("accessToken", "");
    setUserStore("userEmail", "");
    localStorage.clearItem("email");
    localStorage.clearItem("refreshToken");
    setUserStore("loggedIn", false);
}

// export const createUserStore = () => {
//     // const existingRefreshToken = localStorage.getItem("refreshToken")

//     // if (existingRefreshToken !== null && existingRefreshToken !== "") {
//     //     setUserStore("refreshToken", existingRefreshToken);
//     // }

//     console.log("userStore created. " + (existingRefreshToken !== null && existingRefreshToken !== "" ? "Existing refresh token found: " + existingRefreshToken : "No refresh token found."));
// };