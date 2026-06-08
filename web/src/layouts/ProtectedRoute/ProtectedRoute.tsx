import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Component, createSignal, onMount, Show } from "solid-js";

const ProtectedRoute: Component<RouteSectionProps<unknown>> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
    const navigate = useNavigate();

    const checkAuth = () => {
        navigate("/auth", { replace: true });
    }

    onMount(checkAuth);

    return (
        <Show when={isAuthenticated()} fallback={<div>Authenticating user...</div>}>
            {props.children}
        </Show>
    );
}

export default ProtectedRoute;