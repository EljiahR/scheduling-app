import styles from "./ManageScheduleCard.module.css";
import Card from "../Card"

export default () => {
    return (
        <Card title="Manage Schedule" shortcut="/manage-schedule">
            <div id={styles.manageScheduleCard}></div>
        </Card>
    )
}