import Card from "../../components/Card";
import PunchCard from "../../components/PunchCard";
import styles from "./Home.module.css";

export default () => {
    return (
        <div id={styles.home}>
            <PunchCard />
            <Card>f</Card>
            <Card>f</Card>
        </div>
    )
}