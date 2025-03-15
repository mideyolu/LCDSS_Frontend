import { useRef } from "react";
import ChangePassword from "../routes/ChangePassword";
import Dashboard from "../routes/Dashboard";
import Detection from "../routes/Detection";
import HomePage from "../routes/HomePage";
import Login from "../routes/Login";
import Onboarding from "../routes/Onboarding";
import Signup from "../routes/Signup";

export const RoutesWithRefs = () => {
    const faqRef = useRef(null);
    const featuresRef = useRef(null);

    return [
        {
            path: "/",
            element: <HomePage faqRef={faqRef} featuresRef={featuresRef} />,
        },
        { path: "/onboarding", element: <Onboarding /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/detect", element: <Detection /> },
        { path: "/change-password", element: <ChangePassword /> },
    ];
};
