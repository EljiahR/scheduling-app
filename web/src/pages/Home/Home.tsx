import Card from "../../components/Card";
import ManageScheduleCard from "../../components/ManageScheduleCard";
import PersonalScheduleCard from "../../components/PersonalScheduleCard";
import PunchCard from "../../components/PunchCard";
import styles from "./Home.module.css";

export default () => {
    return (
        <div id={styles.home}>
            <PunchCard />
            <ManageScheduleCard />
            <PersonalScheduleCard />
            <Card>f</Card>
            <Card>f</Card>
            <Card>f</Card>
            <Card>f</Card>
            <Card>f</Card>
            <Card>f</Card>
        </div>
    )
}