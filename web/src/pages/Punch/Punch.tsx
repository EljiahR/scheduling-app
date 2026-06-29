import { createSignal, onMount } from "solid-js";
import styles from "./Punch.module.css";
import { Punch } from "../../utils/types/apiReturnTypes";
import { apiGetTimeCard } from "../../utils/api/timecardApi";

export default () => {
    const [loadingPage, setLoadingPage] = createSignal<boolean>(false);
    const [punches, setPunches] = createSignal<Punch[]>([]);

    const retrieveTimeCard = async () => {
        try {
            setLoadingPage(true);
            const timeCard = await apiGetTimeCard();

            setPunches(timeCard);
        } catch (e) {
            console.log("Unable to retrieve time card.");
        } finally {
            setLoadingPage(false);
        }
    }

    onMount(retrieveTimeCard);
    
    return (
        <div id={styles.punchPage}>PUNCH</div>
    )
}