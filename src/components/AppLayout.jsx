import { Outlet } from "react-router-dom";
import PageLayout from "./PageLayout";


export default function AppLayout() {
    return (
        <PageLayout>
            <Outlet />
        </PageLayout>
    );
}