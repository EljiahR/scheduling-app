import { createSignal } from "solid-js"
import Card from "../../components/Card"
import styles from "./Auth.module.css"
import LoadingRing from "../../components/LoadingRing";
import wait from "../../utils/wait";

export default () => {
    const [email, setEmail] = createSignal<string>("");
    const [password, setPassword] = createSignal<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = createSignal<boolean>(false);
    const [isLoading, setIsLoading] = createSignal<boolean>(false);

    const handleFormSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        try {
            // send form
            setIsLoading(true);
            await wait(1000);
        } catch (e) {
            // handle form not good
        } finally {
            setPassword("");
            setIsPasswordVisible(false);
            setIsLoading(false);
        }
    };

    const handleViewPasswordToggle = () => {
        setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
    };
    
    return (
        <div id={styles.authPage}>
            <Card styles="width: 80%; max-width: 500px; height: 400px; display: flex; justify-content: center; align-items: center;">
                <form id={styles.authForm} onSubmit={(e) => handleFormSubmit(e)}>
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
                    <button type="submit">{isLoading() ? <LoadingRing /> : "Sign In"}</button>
                </form>
            </Card>
        </div>
    )
};