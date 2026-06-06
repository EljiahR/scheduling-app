import { createSignal } from "solid-js"
import Card from "../../components/Card"
import styles from "./Auth.module.css"

export default () => {
    const [email, setEmail] = createSignal<string>("");
    const [password, setPassword] = createSignal<string>("");
    
    return (
        <div id={styles.authpage}>
            <Card styles="width: 80%; height: 400px;">
                <form>
                    <label>Email</label>
                    <input id="auth-email" type="email" value={email()} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input id="auth-password" type="password" value={password()} onChange={(e) => setPassword(e.target.value)}/>/>
                </form>
            </Card>
        </div>
    )
}