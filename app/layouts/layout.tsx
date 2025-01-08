import { Outlet } from "react-router";
import { GlobalHeader } from "~/components/GlobalHeader";

export default function ProjectLayout() {
    return (
        <div>
            <GlobalHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
}