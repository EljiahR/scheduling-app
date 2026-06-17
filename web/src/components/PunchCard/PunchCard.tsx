import "../../global.css";
import Card from "../Card"
import styles from "./PunchCard.module.css";

export default () => {
    return (
        <Card title="Time Card" shortcut="/time-card">
            <div id={styles.punchCard}>
                <p>Last punch: </p>
                <button class={styles.punchBtn + " theme-d2"}>Punch In</button>
                <button class={styles.punchBtn + " theme-d2"}>Punch Out</button>
            </div>
        </Card>
    )
}