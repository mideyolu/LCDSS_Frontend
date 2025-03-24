import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/Sidebar/SideBar";
import { RoutesWithRefs } from "./config/routesConfig";
import { userInfo } from "./hooks/userInfo";
import Dashboard from "./routes/Dashboard";
import NotFound from "./routes/NotFound";

const App = () => {
    const { fullname, username, email } = userInfo();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const location = useLocation();
    const routes = RoutesWithRefs();

    const hideNavbarRoutes = [
        "/login",
        "/onboarding",
        "/signup",
        "/dashboard",
        "/detect",
        "/change-password",
    ];
    const showSidebarRoutes = ["/dashboard", "/detect"];

    const isNotFoundPage = !routes.some(
        (route) => route.path === location.pathname,
    );

    return (
        <div className=" mx-auto">
            {!hideNavbarRoutes.includes(location.pathname) &&
                !isNotFoundPage && (
                    <Navbar
                        faqRef={routes[0].element.props.faqRef}
                        featuresRef={routes[0].element.props.featuresRef}
                        teamRef={routes[0].element.props.teamRef}
                    />
                )}

            {showSidebarRoutes.includes(location.pathname) &&
                !isNotFoundPage && (
                    <SideBar
                        fullname={fullname}
                        username={username}
                        email={email}
                        collapsed={sidebarCollapsed}
                        setCollapsed={setSidebarCollapsed}
                    />
                )}

            <Routes>
                {routes.map((route, index) => (
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
                <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer position="top-right" autoClose={1500} />
            {!hideNavbarRoutes.includes(location.pathname) &&
                !isNotFoundPage && (
                    <Footer
                        sidebarCollapsed={sidebarCollapsed}
                        faqRef={routes[0].element.props.faqRef}
                        featuresRef={routes[0].element.props.featuresRef}
                        teamRef={routes[0].element.props.teamRef}
                    />
                )}
        </div>
    );
};

export default App;
