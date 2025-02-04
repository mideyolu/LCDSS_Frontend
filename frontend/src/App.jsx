import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/Sidebar/SideBar";
import { userInfo } from "./hooks/userInfo";
import Dashboard from "./routes/Dashboard";
import { routesConfig } from "./routes/routesConfig";

const App = () => {
    const { fullname, username, email } = userInfo();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const location = useLocation();

    const hideNavbarRoutes = [
        "/login",
        "/onboarding",
        "/signup",
        "/dashboard",
        "/detect",
    ];
    const showSidebarRoutes = ["/dashboard", "/detect"];

    return (
        <div className="container mx-auto px-4 py-2 lg:px-8 lg:py-4">
            {/* Navbar */}
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

            {/* Sidebar */}
            {showSidebarRoutes.includes(location.pathname) && (
                <SideBar
                    fullname={fullname}
                    username={username}
                    email={email}
                    collapsed={sidebarCollapsed}
                    setCollapsed={setSidebarCollapsed}
                />
            )}

            {/* Routes */}
            <Routes>
                {routesConfig.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            route.path === "/dashboard" ? (
                                <Dashboard
                                    sidebarCollapsed={sidebarCollapsed}
                                />
                            ) : (
                                route.element
                            )
                        }
                    />
                ))}
            </Routes>

            {/* Footer */}
            <ToastContainer position="top-right" autoClose={1500} />
            {!hideNavbarRoutes.includes(location.pathname) && (
                <Footer sidebarCollapsed={sidebarCollapsed} />
            )}
        </div>
    );
};

export default App;
