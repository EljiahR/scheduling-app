import { createSignal, For, onMount, Show } from "solid-js";
import styles from "./TimeCard.module.css";
import { DailyPunches, Punch } from "../../utils/types/apiReturnTypes";
import { apiGetTimeCard } from "../../utils/api/timecardApi";
import LoadingBars from "../../components/LoadingBars";

export default () => {
    const [loadingPage, setLoadingPage] = createSignal<boolean>(false);
    const [timeCard, setTimeCard] = createSignal<DailyPunches[]>([]);
    const [selectedWeek, setSelectedWeek] = createSignal<Date[]>([]);

    const getCurrentWeek = () => {
        const day = new Date();
        const locale = new Intl.Locale("en-us");
        const currentWeek = locale.getWeekInfo();
        const firstDay = currentWeek.firstDay;
        
        while (day.getDay() !== (firstDay % 7)) {
            day.setDate(day.getDate() - 1);
        }

        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);
        day.setMilliseconds(0);

        const week = [] as Date[];
        for (let i = 0; i < 7; i++) {
            week.push(new Date(day.getTime() + (i * 24 * 60 * 60 * 1000)));
        }
        setSelectedWeek(week);
        console.log(selectedWeek());
    }

    const retrieveTimeCard = async () => {
        try {
            setLoadingPage(true);
            const punches = await apiGetTimeCard();

            setTimeCard(punches);
        } catch (e) {
            console.log("Unable to retrieve time card.");
        } finally {
            setLoadingPage(false);
        }
    }

    const initializeTimeCard = async() => {
        getCurrentWeek();
        await retrieveTimeCard();
    }

    onMount(initializeTimeCard);
    
    return (
        <div id={styles.timeCardPage}>
            <Show when={!loadingPage()} fallback={<LoadingBars />}>
                <div id={styles.options}></div>
                <div id={styles.timeCardContainer}>
                    {/* Header Row */}
                    <EmptyCell />
                    <HeaderCell text="In" />
                    <HeaderCell text="Out" />
                    <HeaderCell text="In" />
                    <HeaderCell text="Out" />
                    <For each={timeCard()}>
                        {(day) => {
                            return (
                                <>
                                    <DateCell text={day.day} />
                                    <For each={day.punches}>
                                        {(punch) => {
                                            let punchShouldBeIn = true;
                                            if ((punchShouldBeIn && punch.inPunch) || (!punchShouldBeIn && !punch.inPunch)) {
                                                punchShouldBeIn = !punchShouldBeIn;
                                                return <PunchCell text={punch.time} />
                                            } else {
                                                return (
                                                    <>
                                                        <PunchCell text="" />
                                                        <PunchCell text={punch.time} />
                                                    </>
                                                );
                                            }
                                        }}
                                    </For>
                                </>
                            )
                        }}
                    </For>
                </div>
            </Show>
        </div>
    )
}

interface TextProps {
    text?: string
}

const EmptyCell = () => {
    return <div class={styles.emptyCell}></div>
}

const HeaderCell = ({ text }: TextProps) => {
    return <div class={styles.headerCell}>{text ?? ""}</div>
}

const DateCell = ({ text }: TextProps) => {
    return <div class={styles.dateCell}>{text ?? ""}</div>
}

const PunchCell = ({ text }: TextProps) => {
    return <div class={styles.punchCell}>{text ?? ""}</div>
}