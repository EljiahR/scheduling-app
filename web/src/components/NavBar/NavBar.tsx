import { A } from "@solidjs/router";
import "../../global.css";
import styles from "./NavBar.module.css";
import HomeSVG from "./home.svg";
import HamburgerSVG from "./hamburger-menu.svg";

export default () => {
    return (
        <nav id={styles.navbar} class="theme">
            <button><HamburgerSVG height={"30px"} width={"30px"} class="white-svg" /></button>
            <A href="/" class="navlink"><HomeSVG height={"30px"} width={"30px"} class="white-svg" /></A>
        </nav>
    )
}