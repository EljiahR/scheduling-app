import { Component, createSignal, lazy, Match, onMount, Show, Switch } from "solid-js";
import { userStore } from "../../utils/userStore";
import { apiCheckStatus } from "../../utils/api";
import Auth from "../../pages/Auth";
import LoadingBars from "../../components/LoadingBars";

const AuthPage = lazy(() => import("../../pages/Auth"));


const ProtectedRoute: Component<any> = (props) => {
    const [checkingAuth, setCheckingAuth] = createSignal<boolean>(true);
    
    const checkAuth = async () => {
        try {
            await apiCheckStatus();
        } catch (e) {
            console.log(e);
        } finally {
            setCheckingAuth(false)
        }

    }

    onMount(checkAuth);

    return (
       <Show when={!checkingAuth()} fallback={<LoadingBars />}>
        <Switch>
            <Match when={userStore.loggedIn}>
                {props.children}
            </Match>
            <Match when={!userStore.loggedIn}>
                <AuthPage />
            </Match>
        </Switch>
       </Show>
       
    
        // <Show when={userStore.loggedIn} fallback={<div>Authenticating user...</div>}>
        //     {props.children}
        // </Show>
    );
}

export default ProtectedRoute;