import { createSignal } from "solid-js"
import Card from "../../components/Card"
import styles from "./Auth.module.css"

export default () => {
    const [email, setEmail] = createSignal<string>("");
    const [password, setPassword] = createSignal<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = createSignal<boolean>(false);

    const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault();
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
                    <button type="submit">Sign In</button>
                </form>
            </Card>
        </div>
    )
};