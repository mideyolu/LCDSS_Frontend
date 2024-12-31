import HomePage from "./routes/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FAQ from "./routes/FAQ";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Onboarding from "./routes/Onboarding";
import Dashboard from "./routes/Dashboard";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import Detection from "./routes/Detection";
import Chart from "./routes/Chart";

const App = () => {
    const [username, setUsername] = useState(""); // State to store the username
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const hideNavbarRoutes = [
        "/login",
        "/onboarding",
        "/signup",
        "/dashboard",
        "/detect",
        "/chart-dashboard",
    ];

    const showSidebarRoutes = ["/dashboard", "/detect", "/chart-dashboard"];

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    return (
        <div className="container mx-auto px-4 py-2 lg:px-8 lg:py-4">
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

            {/* Sidebar: Conditionally render on specific routes */}
            {showSidebarRoutes.includes(location.pathname) && (
                <SideBar
                    username={username}
                    onCollapseChange={(prev) => setSidebarCollapsed(prev)}
                />
            )}

            <Routes className="">
                <Route path="/" element={<HomePage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/dashboard"
                    element={<Dashboard username={username} sidebarCollapsed={sidebarCollapsed} />}
                />
                <Route
                    path="/detect"
                    element={<Detection sidebarCollapsed={sidebarCollapsed} />}
                />
                <Route
                    path="/chart-dashboard"
                    element={<Chart sidebarCollapsed={sidebarCollapsed} />}
                />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={1500}
                // hideProgressBar
            />

            {!hideNavbarRoutes.includes(location.pathname) && (
                <Footer sidebarCollapsed={sidebarCollapsed} />
            )}
        </div>
    );
};

export default App;
