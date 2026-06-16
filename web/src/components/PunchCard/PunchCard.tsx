import "../../global.css";
import Card from "../Card"
import styles from "./PunchCard.module.css";

export default () => {
    return (
        <Card title="Punches" shortcut="/punches">
            <div id={styles.punchCard}>
                <p>Last punch: </p>
                <button class={styles.punchBtn + " theme-d2"}>In</button>
                <button class={styles.punchBtn + " theme-d2"}>Out</button>
            </div>
        </Card>
    )
}