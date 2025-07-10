import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "@/pages/home/page";
import LoginPage from "@/pages/login/page.tsx";
import DashboardPage from "@/pages/dashboard/page.tsx";
import { Admin, checkHaveAccount } from "@/context/context";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CandidateForm from "@/pages/candidate/page";

export default function MyRouter() {

  const [haveAccount, setHaveAccount] = useState(true);

    let [admin, setAdmin] = useState(false)
    


    useEffect(() => {
        let auth = Cookies.get("auth")
        if (auth) {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, [admin])
    return (
    <checkHaveAccount.Provider value={{ haveAccount, setHaveAccount }}>
        <Admin.Provider value={{admin, setAdmin}}>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={admin ? <Navigate to={"/dashboard"} /> : <LoginPage />} />
            <Route path="/dashboard" element={!admin ? <Navigate to={"/login"} /> : <DashboardPage />} />
            <Route path="/candidate" element={ <CandidateForm />} />
        </Routes>
        </BrowserRouter>
        </Admin.Provider>
        </checkHaveAccount.Provider>
    )
}