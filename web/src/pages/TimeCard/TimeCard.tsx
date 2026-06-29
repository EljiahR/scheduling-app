import { createSignal, onMount } from "solid-js";
import styles from "./TimeCard.module.css";
import { Punch } from "../../utils/types/apiReturnTypes";
import { apiGetTimeCard } from "../../utils/api/timecardApi";

export default () => {
    const [loadingPage, setLoadingPage] = createSignal<boolean>(false);
    const [punches, setPunches] = createSignal<Punch[]>([]);
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
            const timeCard = await apiGetTimeCard();

            setPunches(timeCard);
        } catch (e) {
            console.log("Unable to retrieve time card.");
        } finally {
            setLoadingPage(false);
        }
    }

    onMount(getCurrentWeek);
    
    return (
        <div id={styles.timeCardPage}>
            <div id={styles.options}></div>
            <div id={styles.timeCardContainer}>
                {/* Header Row */}
                <EmptyCell />
                <HeaderCell text="In" />
                <HeaderCell text="Out" />
                <HeaderCell text="In" />
                <HeaderCell text="Out" />
                {/* Sunday Row */}
                <DateCell text="Sunday" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                {/* Monday Row */}
                <DateCell text="Monday" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                {/* Tuesday Row */}
                <DateCell text="Tuesday" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                {/* Wednesday Row */}
                <DateCell text="Wednesday" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                {/* Thursday Row */}
                <DateCell text="Thursday" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                {/* Friday Row */}
                <DateCell text="Friday" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                {/* Saturday Row */}
                <DateCell text="Saturday" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
                <PunchCell text="" />
            </div>
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