import { RouteSectionProps, useLocation, useNavigate } from "@solidjs/router";
import { Component, createSignal, onMount, Show } from "solid-js";
import { userStore } from "../../utils/userStore";
import { apiCheckStatus } from "../../utils/api";

const ProtectedRoute: Component<RouteSectionProps<unknown>> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const checkAuth = async () => {
        const currentPath = location.pathname;
        try {
            await apiCheckStatus();
        } catch (e) {
            console.log(e);
        }   
        
        if (!userStore.loggedIn) {
            navigate(`/auth/skipCheck/${encodeURIComponent(currentPath)}`, { replace: true });
        }

    }

    onMount(checkAuth);

    return (
        <Show when={userStore.loggedIn} fallback={<div>Authenticating user...</div>}>
            {props.children}
        </Show>
    );
}

export default ProtectedRoute;