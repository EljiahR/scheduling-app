import type { Component, JSXElement } from 'solid-js';
import { RouteSectionProps } from '@solidjs/router';

const App: Component<RouteSectionProps<unknown>> = (props) => {
  return (
    <>
      {props.children}
    </>
  );
};

export default App;
