import { RouteSectionProps, useLocation, useNavigate } from "@solidjs/router";
import { Component, createSignal, onMount, Show } from "solid-js";

const ProtectedRoute: Component<RouteSectionProps<unknown>> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    const checkAuth = async () => {
        const currentPath = location.pathname;
        
        navigate(`/auth/${encodeURIComponent(currentPath)}`, { replace: true });
    }

    onMount(checkAuth);

    return (
        <Show when={isAuthenticated()} fallback={<div>Authenticating user...</div>}>
            {props.children}
        </Show>
    );
}

export default ProtectedRoute;