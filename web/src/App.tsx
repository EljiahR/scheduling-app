import { lazy, type Component } from 'solid-js';
import { Route, Router } from '@solidjs/router';
import ProtectedRoute from './layouts/ProtectedRoute';

const MainLayout = lazy(() => import("./layouts/Main"));
const HomePage = lazy(() => import("./pages/Home"));
const ManageSchedulePage = lazy(() => import("./pages/ManageSchedule"));
const PersonalSchedulePage = lazy(() => import("./pages/PersonalSchedule"));
const TimeCardPage = lazy(() => import("./pages/TimeCard"));


const App: Component = () => {
  
  return (
    <ProtectedRoute>
      <Router root={MainLayout}>
        <Route path={"/"} component={HomePage} />
        <Route path={"/time-card"} component={TimeCardPage} />
        <Route path={"manage-schedule"} component={ManageSchedulePage} />
        <Route path={"personal-schedule"} component={PersonalSchedulePage} />
      </Router>
    </ProtectedRoute>
  );
};

export default App;
