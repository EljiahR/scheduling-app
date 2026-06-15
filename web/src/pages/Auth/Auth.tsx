import { createSignal, Match, onMount, Show, Switch } from "solid-js"
import Card from "../../components/Card"
import styles from "./Auth.module.css"
import LoadingRing from "../../components/LoadingRing";
import { apiCheckStatus, apiRefreshToken, apiSignIn } from "../../utils/api";
import { userStore } from "../../utils/userStore";
// import wait from "../../utils/wait";
import LoadingBars from "../../components/LoadingBars";
import { useNavigate, useParams } from "@solidjs/router";
import { stringNullUndefinedOrEmpty } from "../../utils/stringHelpers";

export default () => {
    const [email, setEmail] = createSignal<string>("");
    const [password, setPassword] = createSignal<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = createSignal<boolean>(false);
    const [isWaitingSignIn, setIsWaitingSignIn] = createSignal<boolean>(false);
    const [isCheckingAuth, setIsCheckingAuth] = createSignal<boolean>(true);
    const [signInError, setSignInError] = createSignal<boolean>(false);
    const [returnPath, setReturnPath] = createSignal<string>("/protected");
    const params = useParams();
    const navigate = useNavigate();

    const handleFormSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        try {
            // send form
            setIsWaitingSignIn(true);

            const status = await apiSignIn(email(), password());

            if (status !== 200) {
                throw new Error("unauthorized");
            }

            navigate(returnPath(), { replace: true });
        } catch (e) {
            // handle form not good
            setSignInError(true);
        } finally {
            setPassword("");
            setIsPasswordVisible(false);
            setIsWaitingSignIn(false);
        }
    };

    const handleViewPasswordToggle = () => {
        setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
    };

    const checkAuth = async () => {
        if (params.skipInitialCheck === "skipCheck") {
            console.log("Skipping auth check.");
            setIsCheckingAuth(false);
            return;
        }
        
        console.log("Checking for existing auth...")
        // await wait(2000); 
        const authToken = userStore.token;
        const refreshToken = localStorage.getItem("refreshToken");
        if (!stringNullUndefinedOrEmpty(params.path)) {
            setReturnPath(params.path);
        }
        
        try {
            if (stringNullUndefinedOrEmpty(authToken) && stringNullUndefinedOrEmpty(refreshToken)) {
                throw new Error("No tokens found.");
            } 
            console.log("Token found. Requesting status from server...");
            await apiCheckStatus();

            if (userStore.loggedIn) {
                console.log("User logged in. Redirecting");
                navigate(returnPath(), { replace: true });
            } else {
                console.log("User not logged in.")

            }
        } catch (e) {
            // handle error
            console.log(e);
        } finally {
            setIsCheckingAuth(false);
        }
    }

    onMount(checkAuth);
    
    return (
        <div id={styles.authPage}>
            <Show when={!isCheckingAuth()} fallback={<LoadingBars />}>
                <Card styles="width: 80%; max-width: 500px; height: 400px; display: flex; justify-content: center; align-items: center;">
                    <form id={styles.authForm} onSubmit={(e) => handleFormSubmit(e)}>
                        <Show when={signInError()}>
                            <div id={styles.error}>Email and/or Password incorrect</div>
                        </Show>
                        <div class={styles.floatLabel}>
                            <input id="auth-email" type="email" value={email()} onChange={(e) => setEmail(e.target.value)} placeholder="" required />
                            <label for="auth-email">Email</label>
                        </div>
                        <div class={styles.floatLabel}>
                            <input id="auth-password" type={isPasswordVisible() ? "text" : "password"} value={password()} onChange={(e) => setPassword(e.target.value)} placeholder="" required />
                            <label for="auth-password">Password</label>
                        </div>
                        <div id={styles.visiblePassword}>
                            <input id="visible-password-toggle" type="checkbox" checked={isPasswordVisible()} onClick={handleViewPasswordToggle} />
                            <label for="visible-password-toggle">Show Password?</label>
                        </div>
                        <button type="submit">
                            <Switch>
                                <Match when={isWaitingSignIn()}>
                                    <LoadingRing />
                                </Match>
                                <Match when={!isWaitingSignIn()}>
                                    Sign In
                                </Match>
                            </Switch>
                        </button>
                    </form>
                </Card>
            </Show>
        </div>
    )
};