import { createStore } from "solid-js/store";
import { UserSignInDto } from "./types/apiReturnTypes";
import { convertStringToDate } from "./dateHelpers";

export const [userStore, setUserStore] = createStore({
    loggedIn: false,
    accessToken: "",
    userId: "",
    lastPunch: null as Date | null
});

export const setUserStoreFromResponse = (userInfo: UserSignInDto) => {
    setUserStore("accessToken", userInfo.accessToken);
    setUserStore("userId", userInfo.userId);
    setUserStore("lastPunch", convertStringToDate(userInfo.lastPunch));
    console.log(userStore.lastPunch);
    localStorage.setItem("userId", userInfo.userId);
    localStorage.setItem("refreshToken", userInfo.refreshToken);
    setUserStore("loggedIn", true);
}

export const clearUserStore = () => {
    setUserStore("accessToken", "");
    setUserStore("userId", "");
    localStorage.removeItem("userId");
    localStorage.removeItem("refreshToken");
    setUserStore("loggedIn", false);
}

// export const createUserStore = () => {
//     // const existingRefreshToken = localStorage.getItem("refreshToken")

//     // if (existingRefreshToken !== null && existingRefreshToken !== "") {
//     //     setUserStore("refreshToken", existingRefreshToken);
//     // }

//     console.log("userStore created. " + (existingRefreshToken !== null && existingRefreshToken !== "" ? "Existing refresh token found: " + existingRefreshToken : "No refresh token found."));
// };