import "../../global.css";
import { JSXElement, Show } from "solid-js"
import styles from "./Card.module.css";
import { stringNullUndefinedOrEmpty } from "../../utils/stringHelpers";
import { A } from "@solidjs/router";
import ShortcutSVG from "./shortcut.svg";

interface CardProps {
    children: JSXElement;
    styles?: string;
    title?: string;
    shortcut?: string;
}

export default (props: CardProps) => {
    return (
        <div class={styles.card} style={props.styles}>
            <Show when={!stringNullUndefinedOrEmpty(props.title)}>
                <div class={styles.cardTitle}>
                    <h3>{props.title}</h3>
                    <Show when={!stringNullUndefinedOrEmpty(props.shortcut)}>
                        <A href={props.shortcut!}><ShortcutSVG viewBox="0 0 21 21" class={styles.shortcut + " svg-d5"} /></A>
                    </Show>
                </div>
                <hr />
            </Show>
            {props.children}
        </div>  
    )
}