import { lazy, type Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import ProtectedRoute from './layouts/ProtectedRoute';

const MainLayout = lazy(() => import("./layouts/Main"));
const HomePage = lazy(() => import("./pages/Home"));

const App: Component = () => {
  
  return (
    <ProtectedRoute>
      <Router root={MainLayout}>
        <Route path={"/"} component={HomePage} />
      </Router>
    </ProtectedRoute>
  );
};

export default App;
