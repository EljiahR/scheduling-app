import { createSignal, For, Match, onMount, Show, Switch } from "solid-js";
import styles from "./TimeCard.module.css";
import { DailyPunches, Punch } from "../../utils/types/apiReturnTypes";
import { apiGetTimeCard } from "../../utils/api/timecardApi";
import LoadingBars from "../../components/LoadingBars";
import { dateToPunchFormat, dateToTimeCardHeaderFormat } from "../../utils/dateHelpers";

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
        // getCurrentWeek();
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
                            let inPunchExpected = false;
                            let addBlank = false;
                            let isLastPunch = false;
                            let cellIndex = -1;
                            let remainingRow: null[] = [];
                            return <For each={day.punches}>
                                {(punch, punchIndex) => {
                                   addBlank = false;
                                   cellIndex++;
                                   inPunchExpected = !inPunchExpected;

                                   if ((punch.inPunch && !inPunchExpected) || (!punch.inPunch && inPunchExpected)) {
                                        addBlank = true;
                                        inPunchExpected = !inPunchExpected;
                                        cellIndex++;
                                   }

                                   if (punchIndex() === day.punches.length - 1) {
                                        isLastPunch = true;
                                        const numberOfCells = 4 - ((cellIndex + 1) % 4);
                                        remainingRow = new Array(numberOfCells === 4 ? 0 : numberOfCells);
                                   }
                                   
                                   return <>
                                        <Show when={cellIndex === 0}>
                                            <DateCell date={day.day} />
                                        </Show>
                                        <Show when={cellIndex !== 0 && cellIndex % 4 === 0}>
                                            <DateCell />
                                        </Show>

                                        <Show when={addBlank}>
                                            <PunchCell />
                                        </Show>

                                        <PunchCell date={punch.time} />

                                        <Show when={isLastPunch}>
                                            <For each={remainingRow}>
                                                {() => <PunchCell />}
                                            </For>
                                        </Show>
                                    </>
                                    
                                }}
                            </For>
                        }}
                    </For>
                </div>
            </Show>
        </div>
    )
}

interface TextProps {
    text?: string;
}

interface DateProps {
    date?: Date
}

const EmptyCell = () => {
    return <div class={styles.emptyCell}></div>
}

const HeaderCell = ({ text }: TextProps) => {
    return <div class={styles.headerCell}>{text ?? ""}</div>
}

const DateCell = ({ date }: DateProps) => {
    return <div class={styles.dateCell}>{dateToTimeCardHeaderFormat(date) ?? ""}</div>
}

const PunchCell = ({ date }: DateProps) => {
    return <div class={styles.punchCell}>{dateToPunchFormat(date) ?? ""}</div>
}

const ErrorPunchCell = () => {
    return <div class={styles.errorPunchCell}><div class={styles.errorFiller}></div></div>
}