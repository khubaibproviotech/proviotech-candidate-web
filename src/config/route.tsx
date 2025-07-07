import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/home/page";
import LoginPage from "@/pages/login/page.tsx";
import DashboardPage from "@/pages/dashboard/page.tsx";

export default function MyRouter() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
        </BrowserRouter>
    )
}