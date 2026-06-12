import { A } from "@solidjs/router";
import "../../global.css";
import styles from "./NavBar.module.css";

export default () => {
    return (
        <nav id={styles.navbar} class="theme">
            <A href="/">Home</A>
            <A href="/protected">Protected</A>
            <A href="/auth">Auth</A>
        </nav>
    )
}