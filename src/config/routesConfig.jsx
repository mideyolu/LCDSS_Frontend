// import Dashboard from "../routes/Dashboard";
// import Detection from "../routes/Detection";
// import FAQ from "../routes/FAQ";
// import HomePage from "../routes/HomePage";
// import Login from "../routes/Login";
// import Onboarding from "../routes/Onboarding";
// import Signup from "../routes/Signup";
// import ChangePassword from "../routes/ChangePassword";

// export const routesConfig = [
//     { path: "/", element: <HomePage /> },
//     { path: "/faq", element: <FAQ /> },
//     { path: "/onboarding", element: <Onboarding /> },
//     { path: "/login", element: <Login /> },
//     { path: "/signup", element: <Signup /> },
//     { path: "/dashboard", element: <Dashboard /> },
//     { path: "/detect", element: <Detection /> },
//     { path: "/change-password", element: <ChangePassword /> },
// ];


import { useRef } from "react";
import Dashboard from "../routes/Dashboard";
import Detection from "../routes/Detection";
import HomePage from "../routes/HomePage";
import Login from "../routes/Login";
import Onboarding from "../routes/Onboarding";
import Signup from "../routes/Signup";
import ChangePassword from "../routes/ChangePassword";

export const RoutesWithRefs = () => {
    const faqRef = useRef(null);

    return [
        { path: "/", element: <HomePage faqRef={faqRef} /> },
        { path: "/onboarding", element: <Onboarding /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/detect", element: <Detection /> },
        { path: "/change-password", element: <ChangePassword /> },
    ];
};
