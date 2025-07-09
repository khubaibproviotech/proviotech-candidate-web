import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/home/page";
import LoginPage from "@/pages/login/page.tsx";
import DashboardPage from "@/pages/dashboard/page.tsx";
import { Admin, checkHaveAccount } from "@/context/context";
import { useEffect, useState } from "react";


export default function MyRouter() {

  const [haveAccount, setHaveAccount] = useState(true);

    let [admin, setAdmin] = useState(null)

    useEffect(() => {
        setAdmin(null)
    }, [])
    return (
    <checkHaveAccount.Provider value={{ haveAccount, setHaveAccount }}>
        <Admin.Provider value={{admin, setAdmin}}>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
        </BrowserRouter>
        </Admin.Provider>
        </checkHaveAccount.Provider>
    )
}