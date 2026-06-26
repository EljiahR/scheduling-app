import { createSignal, Match, onMount, Show, Switch } from "solid-js"
import Card from "../../components/Card"
import styles from "./Auth.module.css"
import LoadingRing from "../../components/LoadingRing";
import { apiSignIn } from "../../utils/api";

export default () => {
    const [email, setEmail] = createSignal<string>("");
    const [password, setPassword] = createSignal<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = createSignal<boolean>(false);
    const [isWaitingSignIn, setIsWaitingSignIn] = createSignal<boolean>(false);
    const [signInError, setSignInError] = createSignal<boolean>(false);

    const handleFormSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        try {
            // send form
            setIsWaitingSignIn(true);

            const status = await apiSignIn(email(), password());

            if (status !== 200) {
                throw new Error("unauthorized");
            }

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
    
    return (
        <div id={styles.authPage}>
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
        </div>
    )
};