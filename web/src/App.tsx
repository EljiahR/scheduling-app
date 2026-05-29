import type { Component } from 'solid-js';
import Comp from './Comp';
import NavBar from './components/NavBar';

const App: Component = () => {
  return (
    <>
      <NavBar />
      <Comp />
    </>
  );
};

export default App;
