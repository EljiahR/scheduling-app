import { A } from "@solidjs/router";
import "../../global.css";
import styles from "./NavBar.module.css";
import HomeSVG from "./home.svg";
import HamburgerSVG from "./hamburger-menu.svg";
import { createSignal, Show } from "solid-js";
import NavOverlay from "../NavOverlay";

export default () => {
    const [showOverlay, setShowOverlay] = createSignal<boolean>(false);

    const toggleOverlay = () => {
        setShowOverlay((showOverlay) => !showOverlay);
    }
    
    return (
        <nav id={styles.navbar} class="theme">
            <button class="svg-btn" onClick={toggleOverlay}>
                <HamburgerSVG height={"30px"} width={"30px"} class="white-svg" />
            </button>
            <A href="/" class="navlink"><HomeSVG height={"30px"} width={"30px"} class="white-svg" /></A>
            <Show when={showOverlay()}>
                <NavOverlay toggleOverlay={toggleOverlay}  />
            </Show>
        </nav>
    )
}