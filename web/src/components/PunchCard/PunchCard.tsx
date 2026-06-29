import "../../global.css";
import Card from "../Card"
import styles from "./PunchCard.module.css";
import { apiSendPunch } from "../../utils/api/timecardApi";
import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import LoadingRing from "../LoadingRing";
import { setUserStore, userStore } from "../../utils/userStore";
import { convertStringToDate, dateToPunchFormat } from "../../utils/dateHelpers";

export default () => {
    const [isSendingPunch, setIsSendingPunch] = createSignal<boolean>(false);
    const lastPunch = createMemo(() => dateToPunchFormat(userStore.lastPunch))
    
    const handlePunch = async (inPunch: boolean) => {
        try {
            setIsSendingPunch(true);
            const punch = await apiSendPunch(inPunch);
            if (punch == null) {
                throw new Error("Error with punch.")
            }
            console.log(punch);
            setUserStore("lastPunch", convertStringToDate(punch.time));
        } catch (e) {
            console.log(e);
        } finally {
            setIsSendingPunch(false);
        }
    }
    
    return (
        <Card title="Time Card" shortcut="/time-card">
            <Switch>
                <Match when={isSendingPunch()}>
                    <LoadingRing />
                </Match>
                <Match when={!isSendingPunch()}>
                    <div id={styles.punchCard}>
                        <Show when={lastPunch() !== null}>
                            <p>Last punch: {lastPunch()}</p>
                        </Show>
                        <button class={styles.punchBtn + " theme-d2"} onClick={() => handlePunch(true)}>Punch In</button>
                        <button class={styles.punchBtn + " theme-d2"} onClick={() => handlePunch(false)}>Punch Out</button>
                    </div>
                </Match>
            </Switch>
        </Card>
    )
}