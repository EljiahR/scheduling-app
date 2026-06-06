import styles from "./Main.module.css";

import { Component } from "solid-js";
import NavBar from "../../components/NavBar";
import { RouteSectionProps } from "@solidjs/router";

const Main: Component<RouteSectionProps<unknown>> = (props) => {
      return (
        <div id={styles.main}>
          <NavBar />
          {props.children}
        </div>
      );
}

export default Main;