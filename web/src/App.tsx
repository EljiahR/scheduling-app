import type { Component } from 'solid-js';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';

const App: Component = () => {
  return (
    <>
      <NavBar />
      <HomePage />
    </>
  );
};

export default App;
