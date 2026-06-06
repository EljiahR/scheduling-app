import { Component } from "solid-js";
import NavBar from "../NavBar";
import { RouteSectionProps } from "@solidjs/router";

const Main: Component<RouteSectionProps<unknown>> = (props) => {
      return (
        <>
          <NavBar />
          {props.children}
        </>
      );
}

export default Main;