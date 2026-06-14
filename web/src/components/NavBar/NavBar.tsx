import { A } from "@solidjs/router";
import "../../global.css";
import styles from "./NavBar.module.css";

export default () => {
    return (
        <nav id={styles.navbar} class="theme">
            <A href="/" class="navlink">Home</A>
            <A href="/protected" class="navlink">Protected</A>
            <A href="/auth/checkAuth" class="navlink">Auth</A>
        </nav>
    )
}