import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Chart from "./routes/Chart";
import Dashboard from "./routes/Dashboard";
import Detection from "./routes/Detection";
import FAQ from "./routes/FAQ";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import Onboarding from "./routes/Onboarding";
import Signup from "./routes/Signup";

const App = () => {
    const [username, setUsername] = useState(""); // State to store the username
    const [email, setEmail] = useState(""); // State to store the email
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

    // Sync localStorage values with state on mount
    useEffect(() => {
        const updateUserInfo = () => {
            setUsername(localStorage.getItem("username") || "");
            setEmail(localStorage.getItem("email") || "");
        };

        updateUserInfo(); // Update immediately on component mount

        return () => {
            // No event listeners to clean up here
        };
    }, []);

    return (
        <div className="container mx-auto px-4 py-2 lg:px-8 lg:py-4">
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

            {/* Sidebar: Conditionally render on specific routes */}
            {showSidebarRoutes.includes(location.pathname) && (
                <SideBar
                    username={username}
                    email={email}
                    onCollapseChange={(prev) => setSidebarCollapsed(prev)}
                />
            )}

            <Routes className="">
                <Route path="/" element={<HomePage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route
                    path="/login"
                    element={
                        <Login setUsername={setUsername} setEmail={setEmail} />
                    }
                />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard
                            username={username}
                            sidebarCollapsed={sidebarCollapsed}
                        />
                    }
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
