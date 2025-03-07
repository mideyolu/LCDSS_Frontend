import Dashboard from "../routes/Dashboard";
import Detection from "../routes/Detection";
import FAQ from "../routes/FAQ";
import HomePage from "../routes/HomePage";
import Login from "../routes/Login";
import Onboarding from "../routes/Onboarding";
import Signup from "../routes/Signup";

export const routesConfig = [
    { path: "/", element: <HomePage /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/onboarding", element: <Onboarding /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/detect", element: <Detection /> },
];
