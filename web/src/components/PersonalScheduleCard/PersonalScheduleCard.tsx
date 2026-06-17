import Card from "../Card";
import styles from "./PersonalScheduleCard.module.css";

export default () => {
    return (
        <Card title="My Schedule" shortcut="/personal-schedule">
            <div id={styles.personalScheduleCard}></div>
        </Card>
    )
}