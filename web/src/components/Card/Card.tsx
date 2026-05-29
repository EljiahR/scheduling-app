import { JSXElement } from "solid-js"
import styles from "./Card.module.css"

interface CardProps {
    children: JSXElement
}

export default (props: CardProps) => {
    return (
        <div class={styles.card}>
            {props.children}
        </div>  
    )
}