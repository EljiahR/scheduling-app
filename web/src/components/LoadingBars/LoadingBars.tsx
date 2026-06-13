import "../../global.css";
import styles from "./LoadingBars.module.css";

export default () => {
    return (
        <div id={styles.container}>
            <div class={styles.bar + " theme"}></div>
            <div class={styles.bar + " theme"}></div>
            <div class={styles.bar + " theme"}></div>
            <div class={styles.bar + " theme"}></div>
            <div class={styles.bar + " theme"}></div>
            <div class={styles.bar + " theme"}></div>
            <div class={styles.bar + " theme"}></div>
        </div>
    )
}