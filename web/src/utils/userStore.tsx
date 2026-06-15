import { createStore } from "solid-js/store";

export const [userStore, setUserStore] = createStore({
    loggedIn: false,
    token: "",
});

// export const createUserStore = () => {
//     // const existingRefreshToken = localStorage.getItem("refreshToken")

//     // if (existingRefreshToken !== null && existingRefreshToken !== "") {
//     //     setUserStore("refreshToken", existingRefreshToken);
//     // }

//     console.log("userStore created. " + (existingRefreshToken !== null && existingRefreshToken !== "" ? "Existing refresh token found: " + existingRefreshToken : "No refresh token found."));
// };