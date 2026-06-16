import { JSXElement, Show } from "solid-js"
import styles from "./Card.module.css";
import { stringNullUndefinedOrEmpty } from "../../utils/stringHelpers";
import { A } from "@solidjs/router";

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
                        <A href={props.shortcut!}>F</A>
                    </Show>
                </div>
                <hr />
            </Show>
            {props.children}
        </div>  
    )
}