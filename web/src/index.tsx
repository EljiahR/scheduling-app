/* @refresh reload */
import "./global.css";
import { render } from 'solid-js/web';
import { Route, Router } from "@solidjs/router";
import 'solid-devtools';
import App from "./App";
import { lazy } from "solid-js";
import Main from "./layouts/Main";
import ProtectedRoute from "./layouts/ProtectedRoute";

const AuthPage = lazy(() => import("./pages/Auth"));
const HomePage = lazy(() => import("./pages/Home"));

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => 
  <Router root={App}>
    <Route path={"/"} component={Main}>
      <Route path={"/"} component={HomePage} />
    </Route>
    <Route path="/protected" component={ProtectedRoute}>
      <Route path={"/"} component={HomePage} />
    </Route>
    <Route path={"/auth"} component={AuthPage} />
  </Router>, 
  root!);
