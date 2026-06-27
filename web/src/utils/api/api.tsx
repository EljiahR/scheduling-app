import axios from "axios";
import { clearUserStore, setUserStore, setUserStoreFromResponse, userStore } from "../userStore";
import { stringNullUndefinedOrEmpty } from "../stringHelpers";
import { UserSignInDto } from "../types/apiReturnTypes";

const BASEURL = import.meta.env.VITE_API_URL;

if (stringNullUndefinedOrEmpty(BASEURL)) {
    console.log(BASEURL);
    throw new Error("VITE_API_URL is not defined.");
}

export const api = axios.create({
    baseURL: BASEURL
});
