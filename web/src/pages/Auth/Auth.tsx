import { createSignal } from "solid-js"
import Card from "../../components/Card"
import styles from "./Auth.module.css"

export default () => {
    const [email, setEmail] = createSignal<string>("");
    const [password, setPassword] = createSignal<string>("");

    const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        
    };
    
    return (
        <div id={styles.authpage}>
            <Card styles="width: 80%; max-width: 500px; height: 400px; display: flex; justify-content: center; align-items: center;">
                <form id={styles.authform} onSubmit={(e) => handleFormSubmit(e)}>
                    <div class={styles.floatlabel}>
                        <input id="auth-email" type="email" value={email()} onChange={(e) => setEmail(e.target.value)} placeholder="" required />
                        <label for="auth-email">Email</label>
                    </div>
                    <div class={styles.floatlabel}>
                        <input id="auth-password" type="password" value={password()} onChange={(e) => setPassword(e.target.value)} placeholder="" required />
                        <label for="auth-password">Password</label>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </Card>
        </div>
    )
}