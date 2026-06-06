import { JSXElement } from "solid-js"
import styles from "./Card.module.css"

interface CardProps {
    children: JSXElement;
    styles?: string;
}

export default (props: CardProps) => {
    return (
        <div class={styles.card} style={props.styles}>
            {props.children}
        </div>  
    )
}