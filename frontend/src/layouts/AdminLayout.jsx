import { Outlet } from "react-router-dom";
import AdminLogin from "../components/Admin/AdminLogin";


export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <h1>Админ-панель</h1>
            <Outlet />
        </div>
    );
}