import type { Component, JSXElement } from 'solid-js';
import { RouteSectionProps } from '@solidjs/router';
import { createUserStore } from './utils/userStore';

const App: Component<RouteSectionProps<unknown>> = (props) => {
  createUserStore();
  
  return (
    <>
      {props.children}
    </>
  );
};

export default App;
